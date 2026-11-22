"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, CheckCircle2 } from "lucide-react";
import { useNora } from "./NoraContext";
import NoraOrb from "./NoraOrb";
import { cn } from "@/lib/utils";

// Phone numbers, e-mails and Norka links inside a reply: kept left-to-right
// (so "+971 …" never flips in Arabic) and made clickable.
const TOKEN = /(\+?\d[\d\s-]{7,}\d|[\w.+-]+@[\w-]+\.[\w.-]+|(?:https?:\/\/)?(?:[\w-]+\.)*(?:norkasolution\.com|vercel\.app)(?:\/[\w\-./]*)?)/g;

function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const cls = "underline decoration-[#6384FF]/50 underline-offset-2 hover:decoration-[#6384FF]";
        if (part.includes("@")) return <a key={i} href={`mailto:${part}`} dir="ltr" className={cls}>{part}</a>;
        if (/^\+?\d/.test(part)) {
          const digits = part.replace(/\D/g, "");
          return <a key={i} href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" dir="ltr" className={cls}>{part.trim()}</a>;
        }
        const href = part.startsWith("http") ? part : `https://${part}`;
        return <a key={i} href={href} target="_blank" rel="noopener noreferrer" dir="ltr" className={cls}>{part}</a>;
      })}
    </>
  );
}

/**
 * The conversation UI (messages + suggestions + input) used by both the
 * hero chat card and the floating widget.
 */
export default function NoraThread({ isAr, compact = false, autoFocus = false }: { isAr: boolean; compact?: boolean; autoFocus?: boolean }) {
  const { messages, loading, booked, send } = useNora();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const greeting = isAr
    ? "أهلاً! أنا نورا، الموظفة الذكية في نوركا. اسألني عن أنظمتنا وخدماتنا، أو احجز عرضاً مجانياً وأنا أرتّبه لك الآن."
    : "Hi! I'm Nora, Norka's AI employee. Ask me about our systems and services, or book a free demo and I'll set it up for you right now.";
  const suggestions = isAr
    ? ["ما هو نوركا ERP؟", "هل يناسب شركة مقاولات؟", "كم التكلفة؟", "أريد حجز عرض مجاني"]
    : ["What is Norka ERP?", "Does it fit a contracting company?", "How much does it cost?", "I want to book a free demo"];

  // keep the newest message in view (scroll the list itself, not the page)
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    void send(text);
  };

  const bubble = (role: "user" | "assistant") =>
    role === "user"
      ? "ms-auto bg-[#3B62FC] text-white rounded-2xl rounded-se-md"
      : "bg-tint-2 text-ink-1 border border-hair rounded-2xl rounded-ss-md";

  return (
    <div className="flex flex-col min-h-0 h-full" dir={isAr ? "rtl" : "ltr"}>
      <div
        ref={listRef}
        data-lenis-prevent
        role="log"
        aria-live="polite"
        aria-busy={loading}
        className={cn("flex-1 min-h-0 overflow-y-auto space-y-3", compact ? "p-4" : "p-5")}
      >
        <div className="flex gap-2.5 items-end">
          <NoraOrb size={28} />
          <p className={cn("max-w-[85%] px-4 py-2.5 text-sm leading-relaxed", bubble("assistant"))}>{greeting}</p>
        </div>

        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex gap-2.5 items-end">
              <NoraOrb size={28} />
              <p className={cn("max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words", bubble("assistant"))}><RichText text={m.content} /></p>
            </div>
          ) : (
            <p key={i} className={cn("max-w-[85%] w-fit px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words", bubble("user"))}>{m.content}</p>
          )
        )}

        {loading && (
          <div className="flex gap-2.5 items-end">
            <NoraOrb size={28} active />
            <span className={cn("inline-flex gap-1.5 px-4 py-3.5", bubble("assistant"))} aria-label={isAr ? "نورا تكتب" : "Nora is typing"}>
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-ink-4 animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
          </div>
        )}

        {booked && (
          <p className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300 px-1">
            <CheckCircle2 className="w-4 h-4" /> {isAr ? "وصل طلبك لفريق نوركا" : "Your request reached the Norka team"}
          </p>
        )}

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => submit(s)}
                className="px-3 py-1.5 rounded-full text-[13px] text-ink-2 bg-tint border border-hair hover:border-[#6384FF]/50 hover:text-ink-1 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className={cn("border-t border-hair", compact ? "p-3" : "p-4")}
      >
        <div className="flex items-end gap-2 rounded-2xl bg-tint border border-hair focus-within:border-[#6384FF]/60 transition-colors ps-4 pe-1.5 py-1.5">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            maxLength={1500}
            placeholder={isAr ? "اكتب سؤالك لنورا…" : "Ask Nora anything about Norka…"}
            aria-label={isAr ? "رسالتك إلى نورا" : "Your message to Nora"}
            className="flex-1 resize-none bg-transparent py-2 text-sm text-ink-1 placeholder:text-ink-4 outline-none max-h-28"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label={isAr ? "إرسال" : "Send"}
            className="grid place-items-center w-9 h-9 rounded-xl bg-[#3B62FC] text-white disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-[11px] text-ink-4 text-center">
          {isAr ? "نورا مساعدة ذكية وتجيب عن نوركا فقط." : "Nora is an AI assistant and answers about Norka only."}
        </p>
      </form>
    </div>
  );
}
