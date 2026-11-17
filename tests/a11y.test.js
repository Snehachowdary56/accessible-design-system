import { describe, it, expect } from "vitest";
const axe = require("axe-core");
const { JSDOM } = require("jsdom");
const { read } = require("./helpers");

const PAGES = ["index.html", "case-study.html", "prototype.html"];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function scan(file) {
  const dom = new JSDOM(read(file), { runScripts: "outside-only", pretendToBeVisual: true });
  dom.window.eval(axe.source);
  const results = await dom.window.axe.run(dom.window.document, {
    runOnly: { type: "tag", values: TAGS },
    // jsdom cannot render colours; contrast is checked from the tokens in tokens.test.js instead
    rules: { "color-contrast": { enabled: false } },
  });
  return results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
}

describe("axe-core WCAG 2.2 AA scan", () => {
  for (const page of PAGES) {
    it(`${page} has no accessibility violations`, async () => {
      expect(await scan(page)).toEqual([]);
    }, 20000);
  }
});
