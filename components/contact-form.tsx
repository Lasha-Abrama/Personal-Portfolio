"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const startedAt = useRef(0);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    setMailto(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          company: formData.get("company"),
          startedAt: startedAt.current,
        }),
      });
      const result = await response.json() as { message?: string; mailto?: string };
      if (!response.ok) throw new Error(result.message || "Please try again.");
      setState("success");
      setMessage(result.message || "Your message is ready.");
      setMailto(result.mailto || null);
      if (!result.mailto) form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please email me directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label>Name<input name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={120} required placeholder="you@company.com" /></label>
      </div>
      <label>Subject<input name="subject" minLength={3} maxLength={120} required placeholder="Project, role, or idea" /></label>
      <label>Message<textarea name="message" minLength={20} maxLength={3000} rows={7} required placeholder="Tell me a little about what you have in mind…" /></label>
      <label className="form-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-actions">
        <button className="button" type="submit" disabled={state === "loading"}>
          {state === "loading" ? <><LoaderCircle className="is-spinning" size={18} />Sending…</> : <>Send message<ArrowUpRight size={18} /></>}
        </button>
        <p>Protected by validation, a hidden honeypot, and a minimum completion time.</p>
      </div>
      {state === "success" ? (
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={20} /><span>{message}</span>
          {mailto ? <a href={mailto}>Open email app<ArrowUpRight size={15} /></a> : null}
        </div>
      ) : null}
      {state === "error" ? <div className="form-status form-status--error" role="alert">{message}</div> : null}
    </form>
  );
}
