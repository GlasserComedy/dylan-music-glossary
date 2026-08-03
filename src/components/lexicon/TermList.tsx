import { useMemo } from "react";
import type { Term } from "@/content/terms";

type Props = {
  terms: Term[];
  activeSlug: string | null;
  selectedLetter: string | null;
  selectedCategory: string | null;
  onSelectTerm: (slug: string) => void;
};

/** Mobile-friendly A–Z list replacing the mind-map cloud on small screens. */
export function TermList({
  terms,
  activeSlug,
  selectedLetter,
  selectedCategory,
  onSelectTerm,
}: Props) {
  const groups = useMemo(() => {
    const filtered = terms
      .filter((t) => (selectedCategory ? t.category === selectedCategory : true))
      .filter((t) =>
        selectedLetter ? t.title[0]!.toUpperCase() === selectedLetter : true,
      )
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));

    const map = new Map<string, Term[]>();
    for (const t of filtered) {
      const letter = t.title[0]!.toUpperCase();
      const bucket = map.get(letter);
      if (bucket) bucket.push(t);
      else map.set(letter, [t]);
    }
    return [...map.entries()];
  }, [terms, selectedCategory, selectedLetter]);

  if (groups.length === 0) {
    return (
      <p className="px-5 py-10 text-center font-body text-sm text-ink/45">
        No terms here yet.
      </p>
    );
  }

  return (
    <div className="px-5 pb-10">
      {groups.map(([letter, items]) => (
        <section key={letter} className="mt-6 first:mt-2">
          <h2 className="sticky top-0 z-10 bg-paper py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/35">
            {letter}
          </h2>
          <ul className="mt-1 divide-y divide-ink/10 border-t border-ink/10">
            {items.map((t) => (
              <li key={t.slug}>
                <button
                  onClick={() => onSelectTerm(t.slug)}
                  className="flex w-full items-baseline justify-between gap-3 py-3 text-left"
                >
                  <span
                    className={`min-w-0 font-body text-[16px] leading-snug ${
                      t.slug === activeSlug ? "text-accent" : "text-ink"
                    }`}
                  >
                    {t.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/35">
                    {t.category}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
