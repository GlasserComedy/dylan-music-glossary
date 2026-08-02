import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Term } from "@/content/terms";
import { Head3D } from "./Head3D";

type Props = {
  terms: Term[];
  activeSlug: string | null;
  selectedLetter: string | null;
  selectedCategory: string | null;
  onSelectTerm: (slug: string) => void;
};

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

/** Simple seeded RNG so the shuffle stays stable across renders. */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  let state = h || 1;
  function next() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Terms that are people (or acts) — these live in the middle band. */
const PEOPLE_SLUGS = new Set([
  "woody-guthrie",
  "joan-baez",
  "john-hammond",
  "pete-seeger",
  "allen-ginsberg",
  "the-band",
  "the-beatles",
  "lead-belly",
  "hank-williams",
  "robert-johnson",
  "jimmie-rodgers",
  "izzy-young",
  "nina-simone",
  "odetta",
  "sister-rosetta-tharpe",
  "elizabeth-cotten",
  "joni-mitchell",
  "patti-smith",
  "bessie-smith",
  "billie-holiday",
  "emmylou-harris",
  "scarlet-rivera",
  "rob-stoner",
  "jimi-hendrix",
  "bob-marley",
  "elvis-presley",
  "buddy-holly",
  "chuck-berry",
  "little-richard",
  "the-byrds",
  "grateful-dead",
  "mark-knopfler",
  "sly-and-robbie",
  "daniel-lanois",
]);

/**
 * Oreo ordering: non-people fill the inner core and the outer crust, while the
 * people sit in the creamy middle band.
 */
function oreoOrder(terms: Term[]): Term[] {
  const people = terms.filter((t) => PEOPLE_SLUGS.has(t.slug));
  const others = terms.filter((t) => !PEOPLE_SLUGS.has(t.slug));
  const inner = others.slice(0, Math.round(others.length * 0.45));
  const outer = others.slice(Math.round(others.length * 0.45));
  return [...inner, ...people, ...outer];
}

type Label = {
  term: Term;
  x: number; // offset from center x
  y: number; // offset from center y
  angle: number;
  baseR: number;
  w: number;
  h: number;
};


const RX_FRAC = 0.98;
const RY_FRAC = 0.9;
const HOLE = 0.26; // keep the center clear for the Dylan head
// Superellipse exponent for the outer boundary: >2 lets the cloud reach
// sparsely into the corners instead of stopping at a plain ellipse.
const BOUND_N = 3.2;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/** Radius (normalised) of the superellipse boundary in a given direction. */
function boundAt(ux: number, uy: number) {
  const d = Math.abs(ux) ** BOUND_N + Math.abs(uy) ** BOUND_N;
  return d <= 0 ? 1 : d ** (-1 / BOUND_N);
}

/**
 * Pixel keep-out zone around the portrait. The drawn silhouette is taller than
 * it is wide, so a plain circle leaves too much air at the sides and crowds the
 * top/bottom. Model it as an ellipse matching the artwork instead.
 */
function headEllipse(w: number, h: number) {
  const box = Math.min(clamp(w * 0.26, 150, 260), clamp(h * 0.26, 150, 260));
  return {
    hrx: (box / 2) * 0.86, // hair silhouette is narrower than the square box
    hry: (box / 2) * 1.0,
  };
}

/** Distance from centre to the keep-out ellipse along a unit direction. */
function headReachAt(ux: number, uy: number, hrx: number, hry: number) {
  const d = Math.hypot(ux / hrx, uy / hry) || 1e-6;
  return 1 / d;
}

/**
 * Big-bang layout: terms are flung out from the centre on a golden-angle
 * spiral in *normalised* space, then mapped onto the stage. Working in
 * normalised space keeps the angular spread even instead of piling labels up
 * at the top and bottom.
 */
function createInitialLayout(terms: Term[], w: number, h: number): Label[] {
  const cx = w / 2;
  const cy = h / 2;
  const rx = (w / 2) * RX_FRAC;
  const ry = (h / 2) * RY_FRAC;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return terms.map((term, i) => {
    // Area-uniform radius so the cloud density is flat, not ring-y.
    const rNorm = Math.sqrt((i + 0.5) / terms.length);
    const r = HOLE + (1 - HOLE) * rNorm;
    const angle = i * goldenAngle;
    return {
      term,
      angle,
      baseR: r,
      x: cx + Math.cos(angle) * r * rx,
      y: cy + Math.sin(angle) * r * ry,
      w: 0,
      h: 0,
    };
  });
}

/**
 * Relaxation in normalised space: push overlapping boxes apart, keep every
 * label a constant pixel distance clear of the portrait, and hold them inside
 * a superellipse so the corners get used sparsely.
 */
function resolveCollisions(labels: Label[], w: number, h: number): Label[] {
  const cx = w / 2;
  const cy = h / 2;
  const rx = (w / 2) * RX_FRAC;
  const ry = (h / 2) * RY_FRAC;
  const headR = headRadius(w, h) + 30;

  const boxes = labels.map((l) => ({
    ...l,
    nx: (l.x - cx) / rx,
    ny: (l.y - cy) / ry,
  }));

  const padX = 10;
  const padY = 4;

  for (let iter = 0; iter < 240; iter++) {
    let moved = false;

    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];

        const dx = (b.nx - a.nx) * rx;
        const dy = (b.ny - a.ny) * ry;
        const halfW = (a.w + b.w) / 2 + padX;
        const halfH = (a.h + b.h) / 2 + padY;

        const overlapX = halfW - Math.abs(dx);
        const overlapY = halfH - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
          moved = true;
          if (overlapX / halfW < overlapY / halfH) {
            const shift = (overlapX / 2 + 1) / rx;
            const dir = dx >= 0 ? 1 : -1;
            a.nx -= dir * shift;
            b.nx += dir * shift;
          } else {
            const shift = (overlapY / 2 + 1) / ry;
            const dir = dy >= 0 ? 1 : -1;
            a.ny -= dir * shift;
            b.ny += dir * shift;
          }
        }
      }
    }

    boxes.forEach((b) => {
      // Work in pixels for the head clearance so the halo stays visually even.
      const px = b.nx * rx;
      const py = b.ny * ry;
      const pd = Math.hypot(px, py) || 1e-6;
      const ux = px / pd;
      const uy = py / pd;

      // The label's own box must clear the head, not just its centre point.
      const reach = (b.w / 2) * Math.abs(ux) + (b.h / 2) * Math.abs(uy);
      const minPx = headR + reach;

      let targetPx = Math.max(pd, minPx);

      const nux = b.nx / (Math.hypot(b.nx, b.ny) || 1e-6);
      const nuy = b.ny / (Math.hypot(b.nx, b.ny) || 1e-6);
      const maxNorm = boundAt(nux, nuy);
      const maxPx = Math.hypot(nux * maxNorm * rx, nuy * maxNorm * ry);
      if (targetPx > maxPx) targetPx = Math.max(minPx, maxPx);

      const scale = targetPx / pd;
      b.nx = (px * scale) / rx;
      b.ny = (py * scale) / ry;
    });

    if (!moved) break;
  }

  return boxes.map((b) => ({
    ...b,
    x: cx + b.nx * rx,
    y: cy + b.ny * ry,
  }));
}

export function MindMap({
  terms,
  activeSlug,
  selectedLetter,
  selectedCategory,
  onSelectTerm,
}: Props) {
  const [ref, size] = useSize<HTMLDivElement>();
  const [shown, setShown] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [labels, setLabels] = useState<Map<string, Label>>(new Map());
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const shuffledTerms = useMemo(
    () => oreoOrder(seededShuffle(terms, "dylan-lexicon-v1")),
    [terms],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Render once at the center with hidden labels so we can measure their real
  // widths, then compute collision-free positions and reveal them.
  useLayoutEffect(() => {
    if (size.w === 0 || size.h === 0) return;

    const initial = createInitialLayout(shuffledTerms, size.w, size.h);
    shuffledTerms.forEach((term, i) => {
      const el = itemRefs.current.get(term.slug);
      if (el) {
        initial[i].w = el.offsetWidth;
        initial[i].h = el.offsetHeight;
      }
    });

    const resolved = resolveCollisions(initial, size.w, size.h);
    const next = new Map<string, Label>();
    resolved.forEach((b) => {
      next.set(b.term.slug, {
        ...b,
        x: b.x - size.w / 2,
        y: b.y - size.h / 2,
      });
    });
    setLabels(next);
  }, [shuffledTerms, size.w, size.h]);

  return (
    <div ref={ref} className="relative h-full w-full">
      {/* Portrait at the centre of the map */}
      <div className="absolute left-1/2 top-1/2 h-[26%] max-h-[260px] min-h-[150px] w-[26%] max-w-[260px] min-w-[150px] -translate-x-1/2 -translate-y-1/2">
        <Head3D className="h-full w-full" />
      </div>

      {size.w > 0 &&
        shuffledTerms.map((term, i) => {
          const label = labels.get(term.slug);
          const isActive = term.slug === activeSlug;
          const isCategoryMatch =
            selectedCategory !== null && term.category === selectedCategory;
          const isLetterMatch =
            selectedLetter !== null &&
            term.title[0]!.toUpperCase() === selectedLetter;
          const isHovered = term.slug === hoveredSlug;

          const x = label ? label.x : 0;
          const y = label ? label.y : 0;
          const visible = !!label && shown;

          return (
            <button
              key={term.slug}
              ref={(el) => {
                if (el) itemRefs.current.set(term.slug, el);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTerm(term.slug);
              }}
              onMouseEnter={() => setHoveredSlug(term.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={`absolute left-1/2 top-1/2 max-w-[10rem] whitespace-normal px-1 text-center font-body text-[14px] leading-tight transition-all duration-100 ease-out will-change-transform ${
                isActive
                  ? "text-accent z-20"
                  : isHovered
                    ? "text-ink z-10"
                    : isCategoryMatch
                      ? "text-ink"
                      : isLetterMatch
                        ? "text-ink"
                        : "text-ink/55 hover:text-ink"
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${visible ? x : 0}px, ${visible ? y : 0}px) scale(${isHovered ? 1.2 : 1})`,
                opacity: visible ? 1 : 0,
                transitionDelay: visible ? "0ms" : `${i * 12}ms`,
              }}
            >
              <span
                className={
                  isActive
                    ? "border-b border-accent pb-0.5"
                    : isCategoryMatch || isLetterMatch
                      ? "border-b border-ink/60 pb-0.5"
                      : ""
                }
              >
                {term.title}
              </span>
            </button>
          );
        })}
    </div>
  );
}
