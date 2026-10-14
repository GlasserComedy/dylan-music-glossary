import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";

const source = readFileSync(new URL("./terms.ts", import.meta.url), "utf8");
function entry(slug) {
  const start = source.indexOf(`slug: "${slug}"`);
  assert.ok(start >= 0);
  const end = source.indexOf('\n    slug: "', start + 1);
  return source.slice(start, end < 0 ? undefined : end);
}

test("Folklore Center keeps the requested live album and playlist", () => {
  const content = entry("folklore-center");
  assert.match(content, /albumId: "4ry3Ryew4ZUOWCMQbbw5c0"/);
  assert.match(content, /youtubeUrl: "https:\/\/youtube.com\/playlist\?list=OLAK5uy_kmTrWL-8sjVSV9osOzr6KmiS6TJBAz8cs"/);
});

test("Izzy Young uses the requested Song to Woody track and video, not the FC album", () => {
  const content = entry("izzy-young");
  assert.match(content, /spotifyId: "7A6hQL07zN2nWOalDmAmft"/);
  assert.match(content, /id: "BJYe23zMR2Y"/);
  assert.doesNotMatch(content, /4ry3Ryew4ZUOWCMQbbw5c0|OLAK5uy_kmTrWL-8sjVSV9osOzr6KmiS6TJBAz8cs/);
});

test("Both entries retain the documentary separately", () => {
  for (const slug of ["folklore-center", "izzy-young"]) {
    assert.match(entry(slug), /kind: "link", url: "https:\/\/www.youtube.com\/watch\?v=If3WGtI5v9s&t=974s"/);
  }
});

test("Chuck Berry uses the requested replacement video", () => {
  assert.match(entry("chuck-berry"), /youtubeUrl: "https:\/\/www.youtube.com\/watch\?v=vQ2FIdJ_uhE&list=RDvQ2FIdJ_uhE&start_radio=1"/);
});

test("Folk Revival links to the existing Dave Van Ronk entry", () => {
  const related = entry("folk-revival").match(/related: \[([^\]]+)\]/);
  assert.ok(related);
  assert.match(related[1], /"dave-van-ronk"/);
});

test("Folklore Center shares Izzy Young's portrait", () => {
  for (const slug of ["folklore-center", "izzy-young"]) {
    const documents = entry(slug).split("documents: [")[1]?.split("related:")[0];
    assert.ok(documents);
    assert.match(documents, /src: izzyPortrait/);
  }
});