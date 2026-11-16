/** Preserve displayed titles, but file a leading article under the next word. */
export function alphabetKey(title) {
  return title.replace(/^the\s+/i, "");
}

export function alphabetLetter(title) {
  return alphabetKey(title).charAt(0).toUpperCase();
}

export function compareTitles(a, b) {
  return alphabetKey(a.title).localeCompare(alphabetKey(b.title)) || a.title.localeCompare(b.title);
}