const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

/** Loads a page, runs the design system script and the page's own inline scripts. */
function loadPage(file) {
  const html = read(file);
  const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true, url: "https://example.test/" + file });
  const { window } = dom;
  window.eval(read("js/components.js"));
  window.DS.init(window.document);
  for (const s of window.document.querySelectorAll("script:not([src])")) window.eval(s.textContent);
  return window;
}

function key(window, el, k) {
  el.dispatchEvent(new window.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }));
}

module.exports = { root, read, loadPage, key };
