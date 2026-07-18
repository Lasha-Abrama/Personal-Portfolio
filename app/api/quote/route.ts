import { randomLocalQuote } from "@/data/quotes";
import type { ProgrammingQuote } from "@/types/portfolio";

function normalizeQuote(payload: unknown): ProgrammingQuote | null {
  if (!payload || typeof payload !== "object") return null;
  const value = payload as Record<string, unknown>;
  const text = [value.text, value.quote, value.content, value.en].find((item) => typeof item === "string");
  const author = [value.author, value.authorName].find((item) => typeof item === "string");
  if (typeof text !== "string" || text.trim().length < 8 || text.length > 240) return null;
  return {
    text: text.trim(),
    author: typeof author === "string" && author.trim() ? author.trim() : "Unknown",
    category: "inspiring",
  };
}

export async function GET(request: Request) {
  const exclude = new URL(request.url).searchParams.get("exclude") ?? undefined;
  let quote = randomLocalQuote(exclude);
  const externalUrl = process.env.QUOTE_API_URL;

  if (externalUrl) {
    try {
      const response = await fetch(externalUrl, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(2500) });
      if (response.ok) {
        const normalized = normalizeQuote(await response.json());
        if (normalized && normalized.text !== exclude) quote = normalized;
      }
    } catch {
      // The curated collection is the expected fallback for timeouts and rate limits.
    }
  }

  return Response.json(quote, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=1800" },
  });
}

