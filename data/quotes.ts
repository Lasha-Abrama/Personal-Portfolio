import type { ProgrammingQuote } from "@/types/portfolio";

export const fallbackQuotes: ProgrammingQuote[] = [
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson & Gerald Jay Sussman",
    category: "classic",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "inspiring",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "classic",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "classic",
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
    category: "inspiring",
  },
  {
    text: "There are only two hard things in computer science: cache invalidation and naming things.",
    author: "Phil Karlton",
    category: "funny",
  },
  {
    text: "It works on my machine.",
    author: "Anonymous",
    category: "funny",
  },
  {
    text: "Weeks of coding can save you hours of planning.",
    author: "Anonymous",
    category: "funny",
  },
];

export function randomLocalQuote(excludeText?: string): ProgrammingQuote {
  const candidates = fallbackQuotes.filter((quote) => quote.text !== excludeText);
  return candidates[Math.floor(Math.random() * candidates.length)] ?? fallbackQuotes[0];
}
