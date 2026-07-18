import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the completed portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Lasha Abramishvili/);
  assert.match(html, /Aspiring Full-Stack Developer/);
  assert.match(html, /Personal Finance App/);
  assert.match(html, /Healthcare Analytics Dashboard/);
  assert.match(html, /Open to internships and junior opportunities/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders each primary route", async () => {
  const routes = [
    ["/projects", /Project archive/],
    ["/about", /About Lasha/],
    ["/contact", /Good work starts with a clear conversation/],
  ];

  for (const [path, expected] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should return 200`);
    assert.match(await response.text(), expected);
  }
});
