"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";
type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const startedAt = useRef(0);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const nextErrors: FieldErrors = {};

    if (values.name.length < 2) nextErrors.name = "Please enter at least 2 characters.";
    if (!emailPattern.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (values.subject.length < 3) nextErrors.subject = "Please enter at least 3 characters.";
    if (!values.message) nextErrors.message = "Please enter a message.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setState("error");
      setMessage("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setState("loading");
    setMessage("");
    setMailto(null);

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
      const result = await response.json() as { message?: string; mailto?: string; errors?: FieldErrors };
      if (result.errors) setErrors(result.errors);
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

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (state === "error") {
      setState("idle");
      setMessage("");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label>
          Name
          <input name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} onChange={() => clearError("name")} />
          {errors.name ? <span className="field-error" id="name-error">{errors.name}</span> : null}
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" maxLength={120} required placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={() => clearError("email")} />
          {errors.email ? <span className="field-error" id="email-error">{errors.email}</span> : null}
        </label>
      </div>
      <label>
        Subject
        <input name="subject" minLength={3} maxLength={120} required placeholder="Project, role, or idea" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} onChange={() => clearError("subject")} />
        {errors.subject ? <span className="field-error" id="subject-error">{errors.subject}</span> : null}
      </label>
      <label>
        Message
        <textarea name="message" maxLength={3000} rows={7} required placeholder="Tell me a little about what you have in mind…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} onChange={() => clearError("message")} />
        {errors.message ? <span className="field-error" id="message-error">{errors.message}</span> : null}
      </label>
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
