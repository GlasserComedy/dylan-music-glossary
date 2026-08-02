## The Dylan Lexicon — v1 plan

A single-page, statically-authored glossary of musical terms illustrated through Bob Dylan's work. Editorial "Newsprint & Ink" look inspired by your reference (off-white paper, black ink, mustard accent, typewriter type) — easy to swap later if you want a different direction.

### Screen layout (desktop-first, responsive)

```text
+----------------------------------------------------------------------+
| THE DYLAN LEXICON                    BROWSE  CATEGORIES  ABOUT   [Q] |
| A glossary of musical terms, inspired by Bob Dylan.                  |
+---------------+------------------------------------+-----------------+
|  ALL TERMS    |                                    |  [selected term]|
|  Songwriting  |     songwriting   harmony          |  DEFINITION     |
|  Lyrics       |  poetry   ( Dylan head )  protest  |  IN DYLAN'S ...  |
|  Genres       |      folk       biography          |  EXAMPLE ▶      |
|  Themes ...   |     narrative   evolution          |  RELATED TERMS  |
|               |                                    |                 |
|  “A poet.     |  ← click head to rotate to next    |                 |
|   A prophet…” |    set of terms                    |                 |
+---------------+------------------------------------+-----------------+
|  A  B  C  D  E  F  G … Z              Click a term or letter.        |
+----------------------------------------------------------------------+
```

- Left rail: category list + pull-quote card.
- Center: Dylan portrait with terms radiating out on faint dotted leader lines; the currently-highlighted term is drawn in mustard.
- Right rail: detail panel for the active term (empty state prompts "Pick a term").
- Bottom: A–Z strip; the current letter is circled in mustard.
- Mobile: stacks to portrait → term chips → detail panel; A–Z becomes a horizontal scroller.

### Head-rotation mechanic

- One generated Dylan portrait (mid-60s, sunglasses, high-contrast ink style).
- Terms are grouped into "sets" of ~8. Each set positions terms at fixed angles around the head.
- Clicking the head advances to the next set: portrait rotates by a small delta (e.g. +8°) with a CSS transition, terms crossfade to the new set.
- After the last set, the next click completes a full 360° and returns to set 1.
- A subtle "click head to continue" hint appears on hover.

### Term detail panel

For the active term, shows:
- Term name (mustard, uppercase)
- **Definition**
- **In Dylan's career** — the contextual paragraph (your "Dylan mastered this…" text)
- **Listening example** — player card. Per term, the data specifies either a Spotify track ID or a YouTube video ID; the panel renders the matching embed (`open.spotify.com/embed/track/...` iframe or `youtube.com/embed/...` iframe). Falls back to a search link if no ID is set yet.
- **Related terms** — clickable chips that swap the panel.

### A–Z lookup

- Letters with at least one term are active; others are dimmed.
- Clicking a letter jumps the panel to the first term for that letter and rotates the head to the set containing it.
- A search icon (top-right) opens a lightweight text filter that lists matching terms.

### Content

Ships with your three entries as authored:
- **Abstract lyrics** — example: *It's Alright, Ma (I'm Only Bleeding)*
- **Acoustic vs. Electric** — example: *Maggie's Farm* (Newport 1965, YouTube)
- **Cover** — example: *Make You Feel My Love* (Adele)

I'll draft ~15–20 more terms across the categories in your reference (songwriting, lyrics & poetry, genres, themes, influences, movements, recordings, biography, cultural impact) so the head has meaningful sets to rotate through. You can edit any of them later by changing one file.

### Visual direction

Default to "Newsprint & Ink" from the options — closest to your reference. Typewriter-style headings (e.g. Special Elite / JetBrains Mono) + a clean serif for definitions, mustard `#d4a017` accent, hairline dotted leaders between terms and the head. If you'd rather go dark (Noir & Gold) or pure mono, say so and I'll swap tokens.

### Technical notes

- TanStack Start, single route at `/` (route-level `head()` with real title/description/OG).
- Content lives in `src/content/terms.ts` as a typed array; sets are derived from that array. No database, no auth.
- Dylan portrait generated once as a PNG asset in `src/assets/` and imported.
- Spotify/YouTube via plain `<iframe>` embeds — no SDK, no keys.
- Design tokens (paper, ink, mustard, muted) added to `src/styles.css`; no hardcoded colors in components.
- Components: `LexiconLayout`, `HeadStage` (portrait + radial term labels + rotation state), `TermDetail`, `MediaEmbed`, `AlphabetStrip`, `CategoryRail`.

### Out of scope for v1

- No CMS / admin editor (adding terms = editing `terms.ts`).
- No user accounts, no saving favorites.
- No audio hosting — playback is via Spotify/YouTube embeds only.
