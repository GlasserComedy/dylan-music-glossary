# Extend desktop head tracking

## Changes
- Let Dylan’s animated head follow the desktop cursor across the entire page, including the white definition panel and blank background.
- Keep the existing static, non-tracking mobile portrait behavior.
- Preserve click-to-close and head-reset behavior; after a reset, the next pointer movement resumes tracking.

## Verification
- Open a term on desktop and move the cursor over the definition panel to confirm the head follows it.
- Confirm the mobile head remains static.
