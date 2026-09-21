import { useMemo } from "react";
import type { Term } from "@/content/terms";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Props = {
  terms: Term[];
  activeLetter: string | null;
  onSelectLetter: (letter: string) => void;
};

export function AlphabetStrip({ terms, activeLetter, onSelectLetter }: Props) {
  const available = useMemo(() => {
    const set = new Set<string>();
    for (const t of terms) set.add(t.title[0]!.toUpperCase());
    return set;
  }, [terms]);

  return (
    <div className="border-t border-ink/10 bg-paper pt-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:py-3">
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center gap-0.5 overflow-x-auto overscroll-x-contain px-3 [scrollbar-width:none] [touch-action:pan-x] md:flex-wrap md:justify-between md:gap-1 md:overflow-visible md:px-4">
        {ALPHABET.map((letter) => {
          const has = available.has(letter);
          const active = activeLetter === letter;
          return (
            <button
              key={letter}
              disabled={!has}
              onClick={() => onSelectLetter(letter)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-typewriter text-sm uppercase transition md:h-7 md:w-7 ${
                active
                  ? "bg-ink text-paper"
                  : has
                    ? "text-ink/70 hover:bg-ink/5 hover:text-ink"
                    : "text-ink/15"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
