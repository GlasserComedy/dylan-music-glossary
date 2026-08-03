import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { TERMS, CATEGORIES } from "@/content/terms";
import { MindMap } from "@/components/lexicon/MindMap";
import { TermList } from "@/components/lexicon/TermList";
import { TermDetail } from "@/components/lexicon/TermDetail";
import { AlphabetStrip } from "@/components/lexicon/AlphabetStrip";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "The Dylan Lexicon — A Glossary of Musical Terms, Illustrated Through Bob Dylan",
      },
      {
        name: "description",
        content:
          "Learn the language of music through the songs of Bob Dylan. An interactive glossary of songwriting, lyrics, genres, and cultural impact — with a listening example for every term.",
      },
      {
        property: "og:title",
        content: "The Dylan Lexicon — A Glossary of Musical Terms",
      },
      {
        property: "og:description",
        content:
          "An interactive glossary of musical terms illustrated through Bob Dylan's songs, with a listening example for every entry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LexiconPage,
});

function LexiconPage() {
  const isMobile = useIsMobile();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const categoryLeaveTimer = useRef<number | null>(null);

  const clearCategoryTimer = () => {
    if (categoryLeaveTimer.current) {
      window.clearTimeout(categoryLeaveTimer.current);
      categoryLeaveTimer.current = null;
    }
  };
  


  const activeTerm = useMemo(
    () => TERMS.find((t) => t.slug === activeSlug) ?? null,
    [activeSlug],
  );
  const activeLetter = activeTerm
    ? activeTerm.title[0]!.toUpperCase()
    : selectedLetter;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = TERMS.map((t) => {
      const title = t.title.toLowerCase();
      const haystack = [
        t.title,
        t.definition,
        t.inDylan,
        t.category,
        t.example.title,
        t.example.note,
        ...(t.examples ?? []).flatMap((ex) => [ex.title, ex.note]),
        ...(t.aliases ?? []),
        ...(t.related ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return null;
      const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : 2;
      return { term: t, score };
    }).filter((r): r is { term: (typeof TERMS)[number]; score: number } => r !== null);
    scored.sort((a, b) => a.score - b.score || a.term.title.localeCompare(b.term.title));
    return scored.slice(0, 8).map((r) => r.term);
  }, [query]);

  const songResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const groups = new Map<
      string,
      { title: string; score: number; terms: (typeof TERMS)[number][] }
    >();
    for (const t of TERMS) {
      const songs = t.examples?.length
        ? t.examples.map((ex) => ex.title)
        : [t.example.title];
      for (const song of songs) {
        const lower = song.toLowerCase();
        if (!lower.includes(q)) continue;
        const score = lower.startsWith(q) ? 0 : 1;
        const existing = groups.get(lower);
        if (existing) {
          if (!existing.terms.includes(t)) existing.terms.push(t);
        } else {
          groups.set(lower, { title: song, score, terms: [t] });
        }
      }
    }
    return [...groups.values()]
      .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title))
      .slice(0, 6);
  }, [query]);


  const openTerm = (slug: string) => {
    const term = TERMS.find((t) => t.slug === slug);
    if (!term) return;
    setSelectedLetter(null);
    setSelectedCategory(null);
    setActiveSlug(slug);
  };

  const handleSelectLetter = (letter: string) => {
    setSelectedCategory(null);
    setSelectedLetter((current) => (current === letter ? null : letter));
  };

  const handleSelectCategory = (category: string) => {
    setSelectedLetter(null);
    setSelectedCategory((current) => (current === category ? null : category));
    setShowCategories(false);
  };


  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper text-ink">
      {/* Header */}
      <header className="relative z-20 shrink-0">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-4 py-4 md:flex md:justify-between md:px-6 md:py-5">
          <div className="min-w-0">
            <h1 className="font-display text-base uppercase leading-none tracking-[0.12em] sm:text-xl md:text-2xl">
              The Dylan Lexicon
            </h1>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 md:text-center md:text-xs md:tracking-[0.22em]">
              A glossary of musical terms
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-3 md:gap-5">
            {/* Categories dropdown */}
            <div
              className="relative py-3 px-4 -my-3 -mx-4"
              onMouseEnter={() => {
                clearCategoryTimer();
                setShowCategories(true);
              }}
              onMouseLeave={() => {
                categoryLeaveTimer.current = window.setTimeout(() => {
                  setShowCategories(false);
                }, 150);
              }}
            >
              <button
                type="button"
                className={`inline-block py-2 px-1 font-mono text-[10px] uppercase tracking-[0.14em] transition md:px-3 md:text-xs md:tracking-[0.22em] ${
                  selectedCategory ? "text-ink" : "text-ink/50"
                } hover:text-ink`}
                onClick={() => setShowCategories((prev) => !prev)}
                aria-label="Browse categories"
              >
                Categories
              </button>

              {showCategories && (
                <div
                  className="absolute left-1/2 top-9 -translate-x-1/2 w-auto min-w-max border border-ink/15 bg-paper p-2 shadow-sm"
                  onMouseEnter={() => {
                    clearCategoryTimer();
                    setShowCategories(true);
                  }}
                  onMouseLeave={() => {
                    categoryLeaveTimer.current = window.setTimeout(() => {
                      setShowCategories(false);
                    }, 150);
                  }}
                >
                  <ul className="space-y-1">
                    {CATEGORIES.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleSelectCategory(category)}
                          className={`block w-full text-left font-body text-xs transition ${
                            selectedCategory === category
                              ? "text-ink"
                              : "text-ink/60 hover:text-ink"
                          }`}
                        >
                          <span
                            className={
                              selectedCategory === category
                                ? "border-b border-ink/60 pb-0.5"
                                : ""
                            }
                          >
                            {category}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <button
                className="p-1 text-ink/50 transition hover:text-ink"
                onClick={() => {
                  setShowSearch((s) => !s);
                  setQuery("");
                }}
                aria-label={showSearch ? "Close search" : "Search terms"}
              >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              {showSearch && (
                <div className="fixed left-4 right-4 top-20 z-30 border border-ink/15 bg-paper p-3 shadow-sm sm:absolute sm:left-auto sm:right-0 sm:top-9 sm:w-72">
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search terms…"
                    className="w-full border-b border-ink/20 bg-transparent pb-1 font-body text-sm outline-none placeholder:text-ink/30 focus:border-ink"
                  />
                  {(searchResults.length > 0 || songResults.length > 0) && (
                    <div className="mt-2 max-h-72 overflow-y-auto">
                      {songResults.length > 0 && (
                        <>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/30">
                            Songs
                          </div>
                          <ul className="mb-2">
                            {songResults.map((s) => (
                              <li key={s.title} className="py-1">
                                <div className="font-body text-sm text-ink">{s.title}</div>
                                <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                                  {s.terms.map((t) => (
                                    <button
                                      key={t.slug}
                                      onClick={() => {
                                        openTerm(t.slug);
                                        setShowSearch(false);
                                        setQuery("");
                                      }}
                                      className="font-mono text-[10px] uppercase tracking-widest text-ink/45 transition hover:text-accent"
                                    >
                                      → {t.title}
                                    </button>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {searchResults.length > 0 && (
                        <>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-ink/30">
                            Terms
                          </div>
                          <ul>
                      {searchResults.map((t) => (
                        <li key={t.slug}>
                          <button
                            onClick={() => {
                              openTerm(t.slug);
                              setShowSearch(false);
                              setQuery("");
                            }}
                            className="block w-full py-1.5 text-left font-body text-sm text-ink/75 transition hover:text-ink"
                          >
                            {t.title}
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-ink/30">
                              {t.category}
                            </span>
                          </button>
                        </li>
                      ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                  {query.trim() &&
                    searchResults.length === 0 &&
                    songResults.length === 0 && (
                    <p className="mt-2 font-body text-sm text-ink/40">No matches.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: scrollable A–Z list. Desktop: mind map stage. */}
      {isMobile ? (
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <TermList
            terms={TERMS}
            activeSlug={activeSlug}
            selectedLetter={selectedLetter}
            selectedCategory={selectedCategory}
            onSelectTerm={openTerm}
          />
          {activeTerm && (
            <div className="fixed inset-0 z-40 bg-paper">
              <TermDetail
                term={activeTerm}
                onSelectTerm={openTerm}
                onClose={() => setActiveSlug(null)}
              />
            </div>
          )}
        </main>
      ) : (
      <main className="relative min-h-0 flex-1">
        <div
          onClick={() => {
            setSelectedLetter(null);
            setSelectedCategory(null);
          }}
          className="h-full px-4 pb-16"
        >
          <div
            className="h-full w-full origin-center transition-transform duration-500 ease-out"
            style={{
              transform: activeTerm
                ? "translateX(-11%) scale(0.78)"
                : "translateX(0) scale(1)",
            }}
          >
            <MindMap
              terms={TERMS}
              activeSlug={activeSlug}
              selectedLetter={selectedLetter}
              selectedCategory={selectedCategory}
              onSelectTerm={openTerm}
            />
          </div>
        </div>


        {activeTerm && (
          <div className="absolute right-0 top-0 bottom-14 z-10 w-full max-w-[400px]">
            <TermDetail
              term={activeTerm}
              onSelectTerm={openTerm}
              onClose={() => setActiveSlug(null)}
            />
          </div>
        )}
      </main>
      )}

      {/* Alphabet */}
      <div
        className={`relative z-10 shrink-0 ${isMobile ? "" : "-translate-y-full"}`}
      >
        <AlphabetStrip
          terms={TERMS}
          activeLetter={activeLetter}
          onSelectLetter={handleSelectLetter}
        />
      </div>
    </div>
  );
}
