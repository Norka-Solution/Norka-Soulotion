import "server-only";
import { Resend } from "resend";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export type Lead = {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  interest?: string;
  notes?: string;
  locale: string;
};

/** E-mails a demo request captured by Nora to the team. Returns false if mail isn't configured or fails. */
export async function sendLead(lead: Lead): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("Lead not sent: RESEND_API_KEY is not set", { name: lead.name });
    return false;
  }
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Interested in", lead.interest],
    ["Notes", lead.notes],
    ["Language", lead.locale === "ar" ? "Arabic" : "English"],
  ];
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#3B62FC;margin:0 0 4px">New demo request from Nora (AI)</h2>
      <p style="color:#64748B;margin:0 0 16px">Captured by the AI assistant on norkasolution.com</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .filter(([, v]) => v && v.trim())
          .map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #E2E8F0;color:#94A3B8;width:130px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600">${esc(v!.trim())}</td></tr>`)
          .join("")}
      </table>
    </div>`;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "NORKA Website <info@norkasolution.com>",
      to: [process.env.CONTACT_EMAIL || "info@norkasolution.com"],
      ...(lead.email ? { replyTo: lead.email.trim() } : {}),
      subject: `Demo request (Nora AI) — ${lead.name.replace(/[\r\n]+/g, " ").slice(0, 80)}`,
      html,
    });
    if (error) {
      console.error("Lead e-mail failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Lead e-mail failed:", err);
    return false;
  }
}
