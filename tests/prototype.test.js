import { describe, it, expect } from "vitest";
const { loadPage } = require("./helpers");

function step(d, n) { return d.querySelector(`.step[data-step="${n}"]`); }
function next(d, from) { step(d, from).querySelector('[data-next]:last-of-type').click(); }

describe("claim prototype", () => {
  it("blocks Continue with errors and focuses the error summary with links to fields", () => {
    const w = loadPage("prototype.html");
    const d = w.document;
    next(d, 1);
    const summary = d.querySelector(".js-error-summary");
    expect(summary.hidden).toBe(false);
    expect(d.activeElement).toBe(summary);
    const links = [...summary.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(links).toEqual(["#policy", "#date"]);
    expect(step(d, 1).hidden).toBe(false);
  });

  it("moves to the next step, updates the stepper and focuses the new heading", () => {
    const w = loadPage("prototype.html");
    const d = w.document;
    d.getElementById("policy").value = "12345678";
    d.getElementById("date").value = "2026-11-03";
    next(d, 1);
    expect(step(d, 2).hidden).toBe(false);
    expect(step(d, 1).hidden).toBe(true);
    expect(d.activeElement.id).toBe("s2");
    expect(d.querySelector('.ds-stepper li[aria-current="step"]').getAttribute("data-step")).toBe("2");
    expect(d.querySelector('.ds-stepper li[data-step="1"]').classList.contains("is-done")).toBe(true);
  });

  it("completes the whole flow and shows the answers for review", () => {
    const w = loadPage("prototype.html");
    const d = w.document;
    d.getElementById("policy").value = "12345678";
    d.getElementById("date").value = "2026-11-03";
    d.querySelector('input[value="Vision"]').checked = true;
    next(d, 1);
    d.getElementById("amount").value = "120.50";
    const receipt = d.getElementById("receipt");
    Object.defineProperty(receipt, "value", { value: "C:\\fakepath\\receipt.pdf" });
    Object.defineProperty(receipt, "files", { value: [{ name: "receipt.pdf" }] });
    next(d, 2);
    expect(step(d, 3).hidden).toBe(false);
    const review = d.getElementById("review").textContent;
    expect(review).toContain("Vision");
    expect(review).toContain("12345678");
    expect(review).toContain("receipt.pdf");
    d.getElementById("claim").dispatchEvent(new w.Event("submit", { cancelable: true }));
    expect(step(d, "done").hidden).toBe(false);
    expect(d.activeElement.id).toBe("sdone");
  });

  it("rejects an amount that is not a number", () => {
    const w = loadPage("prototype.html");
    const d = w.document;
    d.getElementById("policy").value = "12345678";
    d.getElementById("date").value = "2026-11-03";
    next(d, 1);
    d.getElementById("amount").value = "abc";
    next(d, 2);
    expect(d.getElementById("amount-error").textContent).toBe("Amount must be a number, like 120.50");
    expect(step(d, 2).hidden).toBe(false);
  });
});
