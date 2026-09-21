import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Coffee, Mail, Search, X } from "lucide-react";
import { TERMS, CATEGORIES, type Category } from "@/content/terms";
import { MindMap } from "@/components/lexicon/MindMap";
import { TermList } from "@/components/lexicon/TermList";
import { TermDetail } from "@/components/lexicon/TermDetail";
import { AlphabetStrip } from "@/components/lexicon/AlphabetStrip";
import { useIsMobile } from "@/hooks/use-mobile";
import { StaticHead } from "@/components/lexicon/Head3D";
import { MobileCategoryMap } from "@/components/lexicon/MobileCategoryMap";

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
  const [mobileEntered, setMobileEntered] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [viewportReady, setViewportReady] = useState(false);
  const categoryLeaveTimer = useRef<number | null>(null);

  useEffect(() => {
    setViewportReady(true);
  }, []);

  // When a term opens on desktop, reset Dylan's head to face forward.
  useEffect(() => {
    if (activeSlug && !isMobile) {
      window.dispatchEvent(new Event("lexicon:reset-head"));
    }
  }, [activeSlug, isMobile]);

  const clearCategoryTimer = () => {
    if (categoryLeaveTimer.current) {
      window.clearTimeout(categoryLeaveTimer.current);
      categoryLeaveTimer.current = null;
    }
  };
  // Clicking anywhere on empty page background (desktop) resets the view:
  // closes the detail panel and re-centres the portrait.
  useEffect(() => {
    const INTERACTIVE = 'button, a, input, textarea, select, aside, [role="dialog"]';
    const onDocClick = (e: MouseEvent) => {
      // Use composedPath(): the event target may already be detached from the
      // DOM by a React re-render, which makes closest() return null.
      const path = (e.composedPath?.() ?? []) as EventTarget[];
      const hitInteractive = path.some(
        (node) =>
          node instanceof Element &&
          typeof node.matches === "function" &&
          node.matches(INTERACTIVE),
      );
      if (hitInteractive) return;
      const target = e.target as HTMLElement | null;
      if (target?.isConnected && target.closest(INTERACTIVE)) return;
      // Clicking empty page background also closes the search box
      setShowSearch(false);
      setQuery("");
      if (isMobile) return;
      setActiveSlug(null);
      setSelectedLetter(null);
      setSelectedCategory(null);
      window.dispatchEvent(new Event("lexicon:reset-head"));
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isMobile]);

  const openCoffee = () => setShowCoffeeModal(true);

  const goToCategoryHome = () => {
    setMobileEntered(true);
    setActiveSlug(null);
    setSelectedLetter(null);
    setSelectedCategory(null);
    setShowSearch(false);
    setQuery("");
    window.dispatchEvent(new Event("lexicon:reset-head"));
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
        t.categories.join(" "),
        t.example?.title ?? "",
        t.example?.note ?? "",
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
        : t.example
          ? [t.example.title]
          : [];
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
    setActiveSlug(slug);
  };

  const handleSelectLetter = (letter: string) => {
    setSelectedCategory(null);
    setActiveSlug(null);
    setSelectedLetter((current) => (current === letter ? null : letter));
  };

  const handleSelectCategory = (category: string) => {
    setSelectedLetter(null);
    setActiveSlug(null);
    setSelectedCategory((current) => (current === category ? null : category));
    setShowCategories(false);
  };

  /** Terms shown in the map: a category's terms, a letter's terms, else the categories themselves. */
  const mapMode: "categories" | "terms" =
    selectedCategory || selectedLetter ? "terms" : "categories";

  const mapItems = useMemo(() => {
    if (mapMode === "categories") {
      return CATEGORIES.map((c) => ({ id: c, label: c }));
    }
    return TERMS.filter((t) =>
      selectedCategory
        ? t.categories.includes(selectedCategory as Category)
        : t.title[0]!.toUpperCase() === selectedLetter,
    ).map((t) => ({ id: t.slug, label: t.title }));
  }, [mapMode, selectedCategory, selectedLetter]);

  const allTermsSorted = useMemo(
    () => [...TERMS].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );

  const handleMapSelect = (id: string) => {
    if (mapMode === "categories") handleSelectCategory(id);
    else openTerm(id);
  };


  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper text-ink">
      {/* Header */}
      <header className={`relative z-20 shrink-0 ${mobileEntered ? "" : "hidden md:block"}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-4 md:flex md:justify-between md:gap-4 md:px-6 md:py-5">
          <div className="min-w-0">
            <button
              type="button"
              onClick={goToCategoryHome}
              className="block max-w-full text-left font-display text-sm uppercase leading-none tracking-[0.08em] text-ink transition hover:text-ink/70 sm:text-xl sm:tracking-[0.12em] md:text-2xl"
              aria-label="Return to categories"
            >
              The Dylan Lexicon
            </button>
            <p className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 md:block md:text-center md:text-xs md:tracking-[0.22em]">
              A glossary of musical terms
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-5">
            {/* All terms dropdown */}
            <div
              className="relative -m-2 p-2"
              onMouseEnter={() => {
                clearCategoryTimer();
                setShowCategories(true);
              }}
              onMouseLeave={() => {
                categoryLeaveTimer.current = window.setTimeout(() => {
                  setShowCategories(false);
                }, 250);
              }}
            >
              <button
                type="button"
                className={`relative inline-flex items-center px-2 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition after:absolute after:-inset-3 after:content-[''] md:px-8 md:text-[11px] md:tracking-[0.18em] ${
                  activeSlug ? "text-ink" : "text-ink/55"
                } hover:text-ink`}
                onClick={() => setShowCategories((prev) => !prev)}
                aria-label="Browse all terms"
              >
                All Terms
              </button>

              {showCategories && (
                <div
                  className="absolute left-1/2 top-9 -translate-x-1/2 max-h-[70vh] w-64 overflow-y-auto border border-ink/15 bg-paper p-2 pt-4 shadow-sm"
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
                  {/* Invisible hover bridge so the dropdown doesn't close when the cursor enters from below */}
                  <div className="absolute -top-5 left-1/2 h-5 w-48 -translate-x-1/2" />
                  <ul className="space-y-1">
                    {allTermsSorted.map((t) => (
                      <li key={t.slug}>
                        <button
                          onClick={() => {
                            openTerm(t.slug);
                            setShowCategories(false);
                          }}
                          className={`block w-full text-left font-body text-xs transition ${
                            activeSlug === t.slug
                              ? "text-ink"
                              : "text-ink/60 hover:text-ink"
                          }`}
                        >
                          <span
                            className={
                              activeSlug === t.slug
                                ? "border-b border-ink/60 pb-0.5"
                                : ""
                            }
                          >
                            {t.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Buy Me a Coffee */}
            <button
              type="button"
              onClick={openCoffee}
              title="One more cup of coffee"
              aria-label="One more cup of coffee — support The Dylan Lexicon on Buy Me a Coffee"
              className="group inline-flex shrink-0 items-center gap-1 border-b border-ink/20 px-1 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60 transition hover:border-ink/60 hover:text-ink sm:gap-1.5 md:text-[10px] md:tracking-[0.22em]"
            >
              <Coffee className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">One more cup of coffee</span>
            </button>

            {/* Contact */}
            <a
              href="mailto:info@dylanlexicon.com"
              title="Contact us"
              aria-label="Contact us via email"
              className="group inline-flex shrink-0 items-center gap-1 border-b border-ink/20 px-1 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60 transition hover:border-ink/60 hover:text-ink sm:gap-1.5 md:text-[10px] md:tracking-[0.22em]"
            >
              <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Contact</span>
            </a>

            {/* Search */}
            <div className="relative">
              <button
                 className="p-2 text-ink/50 transition hover:text-ink"
                onClick={() => {
                  setShowSearch((s) => !s);
                  setQuery("");
                }}
                aria-label={showSearch ? "Close search" : "Search terms"}
              >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              {showSearch && (
                <div className="fixed left-3 right-3 top-[4.75rem] z-30 max-h-[calc(100dvh-6rem)] overflow-y-auto border border-ink/15 bg-paper p-3 pt-4 shadow-sm sm:absolute sm:left-auto sm:right-0 sm:top-9 sm:w-72 sm:max-h-none sm:overflow-visible sm:pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false);
                      setQuery("");
                    }}
                    className="absolute right-3 top-3 rounded p-1 text-ink/45 transition hover:text-ink sm:hidden"
                    aria-label="Close search panel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search terms…"
                    className="w-full border-b border-ink/20 bg-transparent pb-1 pr-8 font-body text-base outline-none placeholder:text-ink/30 focus:border-ink sm:pr-0 sm:text-sm"
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
                              {t.categories.join(" · ")}
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

      {/* Mobile landing page */}
      <main
        className={`relative min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 md:hidden ${mobileEntered ? "hidden" : "flex"}`}
        role="button"
        aria-label="Continue to The Dylan Lexicon"
        tabIndex={0}
        onClick={() => setMobileEntered(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setMobileEntered(true);
          }
        }}
      >
        <div className="pointer-events-none relative z-20 h-[55vh] w-[55vh] max-h-[360px] max-w-[360px]">
          <StaticHead className="h-full w-full" />
        </div>
        <div className="pointer-events-none relative z-20 mt-8 border-b border-ink/30 px-3 py-2 text-center font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-ink/70">
          Click to continue to
          <br />
          the Dylan Lexicon
        </div>
      </main>

      {/* Mobile: category constellation, then the selected category or letter list */}
      <main
        className={`relative min-h-0 flex-1 flex-col overflow-hidden md:hidden ${mobileEntered ? "flex" : "hidden"}`}
      >
        {selectedCategory || selectedLetter ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedLetter(null);
                }}
                className="shrink-0 font-body text-xs text-ink/55 transition active:text-ink"
              >
                ← Categories
              </button>
              <h2 className="truncate px-3 text-center font-typewriter text-base text-ink">
                {selectedCategory ?? selectedLetter}
              </h2>
              <span className="w-[68px]" aria-hidden="true" />
            </div>
            <TermList
              terms={TERMS}
              activeSlug={activeSlug}
              selectedLetter={selectedLetter}
              selectedCategory={selectedCategory}
              onSelectTerm={openTerm}
            />
          </div>
        ) : (
          <div className="min-h-0 flex-1 px-2 pb-3">
            <MobileCategoryMap
              categories={CATEGORIES}
              onSelect={handleSelectCategory}
            />
          </div>
        )}
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

      {/* Desktop: mind map stage */}
      {viewportReady && !isMobile && <main className="relative hidden min-h-0 flex-1 md:block">
        {mapMode === "terms" && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedLetter(null);
              setActiveSlug(null);
            }}
            className="absolute left-6 top-2 z-20 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 transition hover:text-ink"
          >
            ← All categories
            <span className="ml-2 text-ink/70">
              {selectedCategory ?? selectedLetter}
            </span>
          </button>
        )}
        <div
          onClick={() => {
            setSelectedLetter(null);
            setSelectedCategory(null);
            setActiveSlug(null);
            window.dispatchEvent(new Event("lexicon:reset-head"));
          }}
          className="h-full px-4 pb-16"
        >
          <div
            className="h-full w-full origin-center transition-transform duration-500 ease-out"
            style={{
              transform: activeTerm
                ? "translateX(-26%) scale(0.7)"
                : "translateX(0) scale(1)",
            }}
          >
            <MindMap
              key={mapMode === "categories" ? "categories" : `${selectedCategory ?? selectedLetter}`}
              items={mapItems}
              activeId={mapMode === "categories" ? selectedCategory : activeSlug}
              large={mapMode === "categories"}
              mode={mapMode === "categories" || selectedCategory ? "radial" : "organic"}
              tight={!!selectedCategory}
              onSelect={handleMapSelect}
            />
          </div>
        </div>

        {activeTerm && (
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-end p-4 md:p-8">
            <div className="pointer-events-auto h-[85vh] w-[72vw] overflow-hidden rounded-xl bg-paper shadow-[0_0_80px_rgba(0,0,0,0.15)] lg:w-[58vw] lg:max-w-[940px]">
              <TermDetail
                term={activeTerm}
                onSelectTerm={openTerm}
                onClose={() => setActiveSlug(null)}
              />
            </div>
          </div>
        )}
      </main>}

      {/* Alphabet */}
      <div
        className={`relative z-10 shrink-0 ${mobileEntered ? "block" : "hidden"} md:block md:-translate-y-full`}
      >
        <AlphabetStrip
          terms={TERMS}
          activeLetter={activeLetter}
          onSelectLetter={handleSelectLetter}
        />
      </div>

      {/* Buy Me a Coffee modal: site About section plus the BMC widget iframe */}
      {showCoffeeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-end justify-center bg-ink/60 backdrop-blur-sm md:items-center md:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCoffeeModal(false);
          }}
        >
          <div className="relative flex h-[92dvh] w-full flex-col overflow-y-auto rounded-t-2xl bg-paper shadow-[0_0_60px_rgba(0,0,0,0.25)] md:h-[92vh] md:max-w-[520px] md:rounded-2xl">
            <button
              type="button"
              onClick={() => setShowCoffeeModal(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-paper/90 p-2 text-ink/70 transition hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="shrink-0 border-b border-ink/10 bg-paper-2 p-6">
              <h2 className="font-display text-lg uppercase tracking-[0.12em] text-ink">
                About The Dylan Lexicon
              </h2>
              <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-ink/85">
                <p>
                  We've been Dylan fans since before we were born. Our parents
                  indoctrinated us, and now we indoctrinate our children. The
                  world is cruel, and Dylan is our refuge. He gives us shelter
                  from the storm, any day of the week, any time we think of him
                  or his music.
                </p>
                <p>
                  Now, we are scratching an itch, collectively. A site that was
                  born out of our love of Bob plus our passion for music
                  education, we're marrying the two with your help.
                </p>
                <p>
                  If you appreciate The Dylan Lexicon and want to contribute to
                  its development and maintenance, buy us a coffee — thanks!
                </p>
                <p>One more cup… to the valley below.</p>
              </div>
            </div>

            <div className="min-h-[380px] flex-1 bg-paper">
              <iframe
                src="https://www.buymeacoffee.com/widget/page/dylanlexicon"
                title="Support The Dylan Lexicon on Buy Me a Coffee"
                className="h-full w-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
