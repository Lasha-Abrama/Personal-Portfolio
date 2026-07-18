"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button className="copy-email-button" type="button" onClick={copyEmail} aria-live="polite">
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}

