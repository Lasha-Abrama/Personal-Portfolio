import { profile } from "@/data/profile";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  if (clean(payload.company, 120)) {
    return Response.json({ message: "Thanks — your message has been received." });
  }

  const elapsed = Date.now() - (typeof payload.startedAt === "number" ? payload.startedAt : Date.now());
  if (elapsed < 2500) return Response.json({ message: "Please take a moment to complete the form." }, { status: 429 });

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120);
  const subject = clean(payload.subject, 120);
  const message = clean(payload.message, 3000);

  if (name.length < 2 || !emailPattern.test(email) || subject.length < 3 || message.length < 20) {
    return Response.json({ message: "Please complete every field with a valid email and a little more detail." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (resendKey && destination) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: sender,
          to: [destination],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          html: `<h2>New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
        }),
        signal: AbortSignal.timeout(7000),
      });
      if (!response.ok) throw new Error("Email service unavailable");
      return Response.json({ message: "Thanks — your message has been sent." });
    } catch {
      return Response.json({ message: "The email service is temporarily unavailable. Please use the email draft instead.", mailto: buildMailto(email, name, subject, message) });
    }
  }

  return Response.json({
    message: "The secure email service is not configured yet. Your message is ready in a pre-filled email draft.",
    mailto: buildMailto(email, name, subject, message),
  });
}

function buildMailto(email: string, name: string, subject: string, message: string) {
  const body = `${message}\n\nFrom: ${name} (${email})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
