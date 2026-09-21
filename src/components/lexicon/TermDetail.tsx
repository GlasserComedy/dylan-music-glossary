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
  const examples = (term.examples?.length
    ? term.examples
    : term.example
      ? [term.example]
      : []
  ).filter((ex) => ex.media);

  return (
    <aside
      key={term.slug}
      className="animate-in slide-in-from-bottom-4 fade-in relative flex max-h-[80vh] min-h-0 flex-col overflow-y-auto overscroll-contain bg-paper px-5 pt-5 pb-8 duration-500 ease-out md:px-6 md:pt-6 md:pb-8"
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-6 rounded p-1 text-ink/40 transition hover:text-ink md:right-8"
        aria-label="Close term"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
        {term.categories.join(" · ")}
      </p>
      <h2 className="mt-2 pr-8 font-display text-xl uppercase tracking-[0.06em] text-ink md:text-2xl">
        {term.title}
      </h2>

      {/* Three-column layout: Definition | In Dylan's Career | Examples */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-3 md:gap-5">
        <Column label="Definition">
          <ReadMore text={term.definition} />
        </Column>

        <Column label="In Dylan's Career">
          <ReadMore text={term.inDylan} />

        <Column label={examples.length > 1 ? "Examples" : examples.length === 1 ? "Example" : "Example"} className="rounded-lg md:rounded-none md:bg-transparent bg-paper-2/40 p-4 md:p-0">
          {examples.length > 0 ? (
            <div className="space-y-5">
              {examples.map((ex) => (
                <div
                  key={ex.title}
                  className="rounded border border-ink/10 bg-paper p-3 shadow-sm md:p-4"
                >
                  <MediaEmbed title={ex.title} media={ex.media} />
                  <div className="mt-2">
                    <ReadMore text={ex.note} lines={3} className="text-[13px] text-ink/70" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-[14px] italic text-ink/50">
              No musical example selected.
            </p>
          )}
        </Column>
      </div>

      {term.documents && term.documents.length > 0 && (
        <Section label="Documents" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <Section label="Related Terms" className="mt-8">
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

function Column({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40 md:mb-4">
        {label}
      </h3>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Section({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-ink/10 pt-5 ${className}`}>
      <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
        {label}
      </h3>
      {children}
    </div>
  );
}
