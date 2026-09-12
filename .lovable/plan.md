## Collapsible entry text

- Limit both **Definition** and **In Dylan’s Career** to a few visible lines when an entry opens.
- Add a separate **Read more…** / **Show less** control beneath each section.
- Keep listening examples, documents, and related terms directly below, so they remain visible without scrolling through the full text.
- Reset both sections to collapsed whenever a different entry is selected.
- Preserve the existing desktop and mobile styling, with accessible expanded-state labels.

### Technical details

Implement the interaction within the term detail panel using line clamping and local expanded state keyed by the selected term. Verify the panel on desktop and mobile and run the existing type check.
