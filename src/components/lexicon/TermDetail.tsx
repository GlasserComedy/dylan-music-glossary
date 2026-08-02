import { X } from "lucide-react";
import type { Term } from "@/content/terms";
import { TERMS } from "@/content/terms";
import { MediaEmbed } from "./MediaEmbed";

type Props = {
  term: Term;
  onSelectTerm: (slug: string) => void;
  onClose: () => void;
};

export function TermDetail({ term, onSelectTerm, onClose }: Props) {
  return (
    <aside
      key={term.slug}
      className="animate-in slide-in-from-right-8 fade-in relative flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain border-l border-ink/15 bg-paper px-7 pt-8 pb-28 duration-500 ease-out"
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-6 rounded p-1 text-ink/40 transition hover:text-ink"
        aria-label="Close term"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
        {term.category}
      </p>
      <h2 className="mt-2 pr-8 font-display text-2xl uppercase tracking-[0.06em] text-ink">
        {term.title}
      </h2>

      <Section label="Definition">
        <p className="font-body text-[15px] leading-relaxed text-ink/85">
          {term.definition}
        </p>
      </Section>

      <Section label="In Dylan's Career">
        <p className="font-body text-[15px] leading-relaxed text-ink/85">{term.inDylan}</p>
      </Section>

      <Section label="Example">
        <MediaEmbed title={term.example.title} media={term.example.media} />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-ink/70">
          {term.example.note}
        </p>
      </Section>

      {term.documents && term.documents.length > 0 && (
        <Section label="Documents">
          <div className="space-y-4">
            {term.documents.map((doc) => (
              <figure key={doc.src}>
                <img
                  src={doc.src}
                  alt={doc.caption}
                  loading="lazy"
                  className="w-full border border-ink/15 bg-paper"
                />
                <figcaption className="mt-2 font-body text-[13px] leading-relaxed text-ink/60">
                  {doc.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {term.related && term.related.length > 0 && (

        <Section label="Related Terms">
          <div className="flex flex-wrap gap-2">
            {term.related.map((slug) => {
              const t = TERMS.find((x) => x.slug === slug);
              if (!t) return null;
              return (
                <button
                  key={slug}
                  onClick={() => onSelectTerm(slug)}
                  className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink/70 transition hover:border-ink hover:text-ink"
                >
                  {t.title}
                </button>
              );
            })}
          </div>
        </Section>
      )}
    </aside>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-ink/10 pt-4">
      <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
        {label}
      </h3>
      {children}
    </div>
  );
}
