import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("contains the complete portfolio routes and factual profile content", async () => {
  const [home, projects, about, contact, profile] = await Promise.all([
    read("app/page.tsx"),
    read("app/projects/page.tsx"),
    read("app/about/page.tsx"),
    read("app/contact/page.tsx"),
    read("data/profile.ts"),
  ]);

  assert.match(home, /HomeContent/);
  assert.match(projects, /ProjectExplorer/);
  assert.match(about, /About Lasha/);
  assert.match(contact, /Good work starts with a clear conversation/);
  assert.match(profile, /Lasha Abramishvili/);
  assert.match(profile, /Open to internships and junior opportunities/);
});

test("keeps featured projects and safe public assets in the project", async () => {
  const [projects, readme] = await Promise.all([
    read("data/projects.ts"),
    read("README.md"),
  ]);

  assert.match(projects, /Personal Finance App/);
  assert.match(projects, /EarthLens/);
  assert.match(projects, /Healthcare Analytics Dashboard/);
  assert.match(readme, /public-safe downloadable CV/i);
});
