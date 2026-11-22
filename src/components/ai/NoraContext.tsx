"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export interface NoraMessage {
  role: "user" | "assistant";
  content: string;
  /** shown in the chat but never sent to the API (errors, notices) */
  local?: boolean;
}

interface NoraState {
  messages: NoraMessage[];
  loading: boolean;
  booked: boolean;
  send: (text: string) => Promise<void>;
  /** the floating chat window */
  open: boolean;
  setOpen: (v: boolean) => void;
  /** true while the hero's built-in chat is visible (floating button hides) */
  heroChatVisible: boolean;
  setHeroChatVisible: (v: boolean) => void;
}

const Ctx = createContext<NoraState | null>(null);

/** One conversation with Nora shared by the hero chat and the floating widget. */
export function NoraProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const [messages, setMessages] = useState<NoraMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [open, setOpen] = useState(false);
  const [heroChatVisible, setHeroChatVisible] = useState(false);
  const busy = useRef(false);
  const isAr = locale === "ar";

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, 1500);
      if (!text || busy.current) return;
      busy.current = true;
      const next = [...messages, { role: "user" as const, content: text }];
      setMessages(next);
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            messages: next.filter((m) => !m.local).map(({ role, content }) => ({ role, content })),
          }),
        });
        if (res.status === 429) {
          setMessages((p) => [...p, { role: "assistant", local: true, content: isAr ? "رسائل كثيرة في وقت قصير، انتظر دقيقة ثم حاول مرة أخرى." : "That's a lot of messages at once. Please wait a minute and try again." }]);
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (typeof data.reply !== "string" || !data.reply) throw new Error("empty");
        if (data.booked) setBooked(true);
        setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
      } catch {
        setMessages((p) => [...p, { role: "assistant", local: true, content: isAr ? "حدث خطأ، حاول مرة أخرى أو راسلنا على واتساب +971 50 725 7157." : "Something went wrong. Please try again, or WhatsApp us at +971 50 725 7157." }]);
      } finally {
        busy.current = false;
        setLoading(false);
      }
    },
    [messages, locale, isAr]
  );

  const value = useMemo(
    () => ({ messages, loading, booked, send, open, setOpen, heroChatVisible, setHeroChatVisible }),
    [messages, loading, booked, send, open, heroChatVisible]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNora() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNora must be used inside <NoraProvider>");
  return v;
}

export const NORA_AVATAR = "/images/products/nora-avatar.jpg";
