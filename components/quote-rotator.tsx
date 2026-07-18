"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Braces, RefreshCw } from "lucide-react";
import { fallbackQuotes } from "@/data/quotes";
import type { ProgrammingQuote } from "@/types/portfolio";

function localAlternative(previous?: string) {
  const available = fallbackQuotes.filter((quote) => quote.text !== previous);
  return available[Math.floor(Math.random() * available.length)] ?? fallbackQuotes[0];
}

export function QuoteRotator() {
  const reduceMotion = useReducedMotion();
  const [quote, setQuote] = useState<ProgrammingQuote>(fallbackQuotes[0]);
  const [visibleText, setVisibleText] = useState(reduceMotion ? fallbackQuotes[0].text : "");
  const [loading, setLoading] = useState(false);
  const previousRef = useRef(fallbackQuotes[0].text);

  const loadQuote = useCallback(async () => {
    setLoading(true);
    let next = localAlternative(previousRef.current);
    try {
      const response = await fetch(`/api/quote?exclude=${encodeURIComponent(previousRef.current)}`);
      if (response.ok) {
        const candidate = await response.json() as ProgrammingQuote;
        if (candidate.text && candidate.text !== previousRef.current) next = candidate;
      }
    } catch {
      // The local collection keeps this experience independent of the network.
    }
    previousRef.current = next.text;
    setQuote(next);
    setVisibleText(reduceMotion ? next.text : "");
    setLoading(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setInterval(loadQuote, 9000);
      return () => window.clearInterval(timer);
    }

    let cancelled = false;
    let timer = 0;
    let index = 0;

    const type = () => {
      if (cancelled) return;
      if (index <= quote.text.length) {
        setVisibleText(quote.text.slice(0, index));
        index += 1;
        timer = window.setTimeout(type, 28);
        return;
      }
      timer = window.setTimeout(() => {
        const erase = () => {
          if (cancelled) return;
          setVisibleText((current) => {
            if (current.length === 0) {
              void loadQuote();
              return "";
            }
            timer = window.setTimeout(erase, 14);
            return current.slice(0, -1);
          });
        };
        erase();
      }, 2600);
    };

    type();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [quote.text, loadQuote, reduceMotion]);

  return (
    <section className="quote-section" aria-labelledby="programming-quote-title">
      <div className="container">
        <div className="quote-panel">
          <div className="quote-panel__chrome">
            <span><i /><i /><i /></span>
            <span>thoughts.ts</span>
            <Braces size={17} aria-hidden="true" />
          </div>
          <div className="quote-panel__content">
            <p className="eyebrow"><span aria-hidden="true" />A line worth keeping</p>
            <h2 id="programming-quote-title" className="sr-only">Programming quote</h2>
            <motion.blockquote layout aria-live="polite">
              “{visibleText}<span className="typing-cursor" aria-hidden="true" />”
            </motion.blockquote>
            <div className="quote-attribution">
              <span>— {quote.author || "Unknown"}</span>
              <button type="button" onClick={loadQuote} disabled={loading} aria-label="Show another quote">
                <RefreshCw size={16} className={loading ? "is-spinning" : ""} />
                New line
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

