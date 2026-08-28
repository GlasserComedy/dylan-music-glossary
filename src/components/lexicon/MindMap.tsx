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
 * Interleaved oreo ordering: non-people are split into inner and outer
 * layers, and people sit in the middle band, but we interleave the layers
 * so each angular sector gets a mix of lengths and avoids left/right clustering.
 */
function layeredOreoOrder(terms: Term[]): Term[] {
  const people = terms.filter((t) => PEOPLE_SLUGS.has(t.slug));
  const others = terms.filter((t) => !PEOPLE_SLUGS.has(t.slug));
  const inner = others.slice(0, Math.round(others.length * 0.45));
  const outer = others.slice(Math.round(others.length * 0.45));

  // Shuffle each layer separately so each ring is organic, but interleave them
  // to keep the angular spread even (not a block of people all in one sector).
  const shuffledInner = seededShuffle(inner, "dylan-lexicon-inner");
  const shuffledPeople = seededShuffle(people, "dylan-lexicon-people");
  const shuffledOuter = seededShuffle(outer, "dylan-lexicon-outer");

  const result: Term[] = [];
  const maxLen = Math.max(
    shuffledInner.length,
    shuffledPeople.length,
    shuffledOuter.length,
  );
  for (let i = 0; i < maxLen; i++) {
    if (shuffledInner[i]) result.push(shuffledInner[i]);
    if (shuffledPeople[i]) result.push(shuffledPeople[i]);
    if (shuffledOuter[i]) result.push(shuffledOuter[i]);
  }
  return result;
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


const RX_FRAC = 0.96;
const RY_FRAC = 0.92;
const HOLE = 0.30; // keep the center clear for the Dylan head
// Superellipse exponent for the outer boundary: higher values pull the corners
// inward, keeping the oval crisp while using most of the stage.
const BOUND_N = 4.5;
const EDGE_INSET = 18;
const MAX_LABEL_SCALE = 1.2;

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
 * Airy oval layout: terms are placed on a golden-angle spiral in *normalised*
 * space, then mapped onto the stage. The radius is slightly biased outward so
 * the oval feels open, and the larger stage fractions let it breathe into the
 * surrounding blank space.
 */

const POSITION_OVERRIDES: Record<string, { angle: number; baseR: number; fixed?: boolean }> = {};

function createInitialLayout(terms: Term[], w: number, h: number): Label[] {
  const cx = w / 2;
  const cy = h / 2;
  const rx = (w / 2) * RX_FRAC;
  const ry = (h / 2) * RY_FRAC;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return terms.map((term, i) => {
    const override = POSITION_OVERRIDES[term.slug];
    // Airy oval radius: bias slightly outward (exponent < 0.5) so the centre
    // stays open and the rim carries more labels, using the page's blank space.
    const rNorm = override
      ? override.baseR
      : ((i + 0.5) / terms.length) ** 0.55;
    const r = HOLE + (1 - HOLE) * rNorm;
    const angle = override ? override.angle : i * goldenAngle;
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
function resolveCollisions(
  labels: Label[],
  w: number,
  h: number,
  fixedSlugs?: ReadonlySet<string>,
): Label[] {
  const cx = w / 2;
  const cy = h / 2;
  const rx = (w / 2) * RX_FRAC;
  const ry = (h / 2) * RY_FRAC;
  const { hrx, hry } = headEllipse(w, h);
  const headMargin = 30;
  const isFixed = (slug: string) => fixedSlugs?.has(slug) ?? false;

  const boxes = labels.map((l) => ({
    ...l,
    nx: (l.x - cx) / rx,
    ny: (l.y - cy) / ry,
  }));

  // Airy oval spacing: generous padding everywhere, increasing toward the rim
  // so the outer labels still have room to breathe.
  const maxR = Math.hypot(rx, ry);
  const padAt = (a: { nx: number; ny: number }, b: { nx: number; ny: number }) => {
    const ra = Math.hypot(a.nx * rx, a.ny * ry);
    const rb = Math.hypot(b.nx * rx, b.ny * ry);
    const t = clamp((ra + rb) / 2 / maxR, 0, 1);
    return { padX: 12 + t * 38, padY: 5 + t * 20 };
  };

  // Pixel-space safe rectangle (accounts for hover enlargement) for each box.
  const clampToStage = (b: { nx: number; ny: number; w: number; h: number }) => {
    const halfW = EDGE_INSET + (b.w * MAX_LABEL_SCALE) / 2;
    const halfH = EDGE_INSET + (b.h * MAX_LABEL_SCALE) / 2;
    const px = clamp(cx + b.nx * rx, halfW, Math.max(halfW, w - halfW));
    const py = clamp(cy + b.ny * ry, halfH, Math.max(halfH, h - halfH));
    b.nx = (px - cx) / rx;
    b.ny = (py - cy) / ry;
  };

  for (let iter = 0; iter < 900; iter++) {
    let moved = false;

    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const aFixed = isFixed(a.term.slug);
        const bFixed = isFixed(b.term.slug);
        if (aFixed && bFixed) continue;

        const { padX, padY } = padAt(a, b);
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
            if (!aFixed) a.nx -= dir * shift;
            if (!bFixed) b.nx += dir * shift;
          } else {
            const shift = (overlapY / 2 + 1) / ry;
            const dir = dy >= 0 ? 1 : -1;
            if (!aFixed) a.ny -= dir * shift;
            if (!bFixed) b.ny += dir * shift;
          }
        }
      }
    }

    // Head clearance + oval bound are relaxed as the iterations progress so the
    // final passes prioritise a strictly overlap-free layout.
    const enforceShape = iter < 700;

    boxes.forEach((b) => {
      if (isFixed(b.term.slug)) {
        // Fixed labels keep their override position; we only clamp them to the
        // stage in case the viewport becomes extremely small.
        clampToStage(b);
        return;
      }
      if (!enforceShape) {
        clampToStage(b);
        return;
      }
      // Work in pixels for the head clearance so the halo stays visually even.
      const px = b.nx * rx;
      const py = b.ny * ry;
      const pd = Math.hypot(px, py) || 1e-6;
      const ux = px / pd;
      const uy = py / pd;

      // The label's own box must clear the head, not just its centre point.
      const reach = (b.w / 2) * Math.abs(ux) + (b.h / 2) * Math.abs(uy);
      const minPx = headReachAt(ux, uy, hrx, hry) + headMargin + reach;

      let targetPx = Math.max(pd, minPx);

      const nux = b.nx / (Math.hypot(b.nx, b.ny) || 1e-6);
      const nuy = b.ny / (Math.hypot(b.nx, b.ny) || 1e-6);
      const maxNorm = boundAt(nux, nuy);
      const maxPx = Math.hypot(nux * maxNorm * rx, nuy * maxNorm * ry);
      if (targetPx > maxPx) targetPx = Math.max(minPx, maxPx);

      const scale = targetPx / pd;
      b.nx = (px * scale) / rx;
      b.ny = (py * scale) / ry;
      clampToStage(b);
    });

    if (!moved) break;
  }

  // Final safety net: if anything still overlaps, nudge pairs apart with a
  // minimal gap only (no shape constraints), staying inside the stage.
  for (let iter = 0; iter < 400; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const aFixed = isFixed(a.term.slug);
        const bFixed = isFixed(b.term.slug);
        if (aFixed && bFixed) continue;

        const dx = (b.nx - a.nx) * rx;
        const dy = (b.ny - a.ny) * ry;
        const halfW = (a.w + b.w) / 2 + 8;
        const halfH = (a.h + b.h) / 2 + 4;
        const overlapX = halfW - Math.abs(dx);
        const overlapY = halfH - Math.abs(dy);
        if (overlapX > 0 && overlapY > 0) {
          moved = true;
          if (overlapX / halfW < overlapY / halfH) {
            const shift = (overlapX / 2 + 0.5) / rx;
            const dir = dx >= 0 ? 1 : -1;
            if (!aFixed) a.nx -= dir * shift;
            if (!bFixed) b.nx += dir * shift;
          } else {
            const shift = (overlapY / 2 + 0.5) / ry;
            const dir = dy >= 0 ? 1 : -1;
            if (!aFixed) a.ny -= dir * shift;
            if (!bFixed) b.ny += dir * shift;
          }
          if (!aFixed) clampToStage(a);
          if (!bFixed) clampToStage(b);
        }
      }
    }
    if (!moved) break;
  }

  return boxes.map((b) => ({
    ...b,
    x: clamp(
      cx + b.nx * rx,
      EDGE_INSET + (b.w * MAX_LABEL_SCALE) / 2,
      w - EDGE_INSET - (b.w * MAX_LABEL_SCALE) / 2,
    ),
    y: clamp(
      cy + b.ny * ry,
      EDGE_INSET + (b.h * MAX_LABEL_SCALE) / 2,
      h - EDGE_INSET - (b.h * MAX_LABEL_SCALE) / 2,
    ),
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
    () => layeredOreoOrder(seededShuffle(terms, "dylan-lexicon-v1")),
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

    const fixedSlugs = new Set<string>(
      Object.entries(POSITION_OVERRIDES)
        .filter(([, cfg]) => cfg.fixed)
        .map(([slug]) => slug),
    );

    const resolved = resolveCollisions(initial, size.w, size.h, fixedSlugs);
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
              data-term-label
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
