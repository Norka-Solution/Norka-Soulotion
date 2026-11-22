import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { clientIp, createRateLimiter } from "@/lib/server/rate-limit";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are NORKA Solution's AI assistant on their website. You help visitors learn about the company and its services. Be professional, friendly, and concise.

**About NORKA Solution:**
- Leading IT solutions provider based in the UAE
- Offices in Abu Dhabi, Al Ain, and Dubai
- Founded by Ahmed Kamel (CEO & Founder)
- Managing Director: Eng. Nourhan

**Services:**
1. Web Applications — Custom web apps with React, Next.js, and modern frameworks
2. Mobile Apps — Native and cross-platform iOS/Android development
3. ERP Systems — Enterprise resource planning (inventory, HR, payroll, finance)
4. Website Development — Modern responsive websites and e-commerce
5. IT Infrastructure & Servers — Network design, server management, cloud migration
6. UI/UX Design — User research, wireframing, prototyping, design systems
7. Social Media & Marketing — Content strategy, SEO, paid advertising
8. Company Setup & IT Consulting — Digital transformation, technology audits

**Contact Information:**
- Phone: +971 50 725 7157
- Email: info@norkasolution.com
- Working Hours: Sunday - Thursday, 9:00 AM - 6:00 PM (UAE time)
- Locations: Abu Dhabi, Al Ain, Dubai

**Guidelines:**
- Answer questions about services, pricing approach, timelines, and company info
- For pricing: explain that pricing depends on project scope and requirements, and encourage them to contact the team for a free consultation
- If someone wants to speak with a human, direct them to WhatsApp (+971 50 725 7157) or email
- Keep responses concise (2-4 sentences max unless detailed info is requested)
- Be bilingual: respond in the same language the visitor uses (Arabic or English)
- Never make up information you don't know — suggest contacting the team instead
- Be warm and professional, reflecting NORKA's premium brand image`;

// Abuse limits: this endpoint is public and every call is billed.
const MAX_HISTORY = 12; // only the latest turns are sent to the model
const MAX_CHARS_PER_MESSAGE = 1500;
const MAX_TOTAL_CHARS = 8000;
const limiter = createRateLimiter({ limit: 15, windowMs: 60_000 }); // 15 msgs / min / IP

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS_PER_MESSAGE) return null;
    msgs.push({ role, content: text });
  }
  // The API requires the conversation to start with the visitor.
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  if (msgs.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS) return null;
  return msgs;
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: "Chat is not configured" }, 503);
  }

  const rl = limiter(clientIp(request.headers));
  if (!rl.ok) {
    return json({ error: "Too many messages, please wait a moment" }, 429, {
      "Retry-After": String(rl.retryAfterSec),
    });
  }

  let payload: { messages?: unknown; locale?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const messages = parseMessages(payload.messages);
  if (!messages) return json({ error: "Invalid messages" }, 400);
  const locale = payload.locale === "ar" ? "ar" : "en";

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-5-5",
      // room for brief adaptive thinking plus a short reply
      max_tokens: 2048,
      output_config: { effort: "low" },
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        {
          type: "text",
          text: `The visitor is currently browsing in ${locale === "ar" ? "Arabic" : "English"}. Default to responding in that language unless they switch.`,
        },
      ],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return json({
        reply:
          locale === "ar"
            ? "لا أستطيع المساعدة في هذا الطلب. للتواصل مع فريقنا: واتساب ‎+971 50 725 7157 أو info@norkasolution.com"
            : "I can't help with that request. You can reach our team on WhatsApp (+971 50 725 7157) or at info@norkasolution.com.",
      });
    }

    const reply = response.content
      .flatMap((c) => (c.type === "text" ? [c.text] : []))
      .join("")
      .trim();
    if (!reply) return json({ error: "Empty response" }, 502);

    return json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "Assistant is busy, please try again shortly" }, 503);
    }
    console.error("Chat API error:", err);
    return json({ error: "Failed to get response" }, 500);
  }
}
