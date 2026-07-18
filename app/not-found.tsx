import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__code" aria-hidden="true">404</div>
      <p className="eyebrow"><span aria-hidden="true" />Page not found</p>
      <h1>This route doesn&apos;t exist.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button" href="/"><ArrowLeft size={18} />Back to the portfolio</Link>
    </section>
  );
}
