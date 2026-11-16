import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { alphabetKey, alphabetLetter, compareTitles } from "./alphabet.mjs";

test("The Beatles is filed under B, preserving its display title", () => {
  const term = { title: "The Beatles" };
  assert.equal(alphabetLetter(term.title), "B");
  assert.equal(alphabetKey(term.title), "Beatles");
  assert.equal(term.title, "The Beatles");
});

test("every existing leading-The entry uses its second word", () => {
  const source = readFileSync(new URL("./terms.ts", import.meta.url), "utf8");
  const titles = [...source.matchAll(/slug: "[^"]+",\s+title: "(The [^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(titles.sort(), ["The Band", "The Beatles", "The Byrds"]);
  for (const title of titles) assert.equal(alphabetLetter(title), "B");
});

test("alphabetical ordering ignores only the standalone leading article", () => {
  const titles = ["Time Signature", "The Byrds", "Beat", "The Beatles", "Bard", "The Band", "Theme", "A cappella"];
  assert.deepEqual(titles.map((title) => ({ title })).sort(compareTitles).map((term) => term.title),
    ["A cappella", "The Band", "Bard", "Beat", "The Beatles", "The Byrds", "Theme", "Time Signature"]);
  assert.equal(alphabetLetter("Theme"), "T");
});