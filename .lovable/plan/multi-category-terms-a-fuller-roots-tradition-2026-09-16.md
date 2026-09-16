# Multi-category terms + a fuller Roots & Tradition

## Goal
Let existing terms belong to more than one category so Roots & Tradition can be stocked without emptying Genres & Styles.

## Changes
1. **Schema** — change `Term.category: Category` to `Term.categories: Category[]` in `src/content/terms.ts`.
2. **Data** — convert every term to `categories: ["..."]`; add `"Roots & Tradition"` to terms that are clearly rooted traditions:
   - Ballad
   - Blues
   - Gospel
   - Country
   - Talkin' Blues
   - (keep their current genre/style category too)
3. **UI updates**
   - `index.tsx`: filter terms by `t.categories.includes(selectedCategory)`; show a term's categories in the A–Z list, preferring the one that isn't the active filter.
   - `TermList.tsx`: same filter change; category column shows all relevant categories or the first non-active one.
   - `MindMap.tsx` / `MobileCategoryMap.tsx`: no API change needed; they already receive the pre-filtered item list.
4. **Verify** — run `bunx tsgo --noEmit` and a quick Playwright check that the category map still opens and filters correctly.

## Result
Roots & Tradition grows from 4 to ~9 entries, Genres & Styles keeps its current entries, and the same term can appear in both constellations.