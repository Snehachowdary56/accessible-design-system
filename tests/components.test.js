import { describe, it, expect } from "vitest";
const { loadPage, key } = require("./helpers");

describe("switch", () => {
  it("toggles aria-checked and the visible state on click", () => {
    const w = loadPage("index.html");
    const sw = w.document.getElementById("paperless");
    sw.click();
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.querySelector(".ds-switch__state").textContent).toBe("On");
    sw.click();
    expect(sw.getAttribute("aria-checked")).toBe("false");
  });
});

describe("tabs", () => {
  it("arrow keys move selection, focus and the visible panel", () => {
    const w = loadPage("index.html");
    const d = w.document;
    const tab1 = d.getElementById("tab-1");
    key(w, tab1, "ArrowRight");
    expect(d.getElementById("tab-2").getAttribute("aria-selected")).toBe("true");
    expect(d.activeElement.id).toBe("tab-2");
    expect(d.getElementById("panel-2").hidden).toBe(false);
    expect(d.getElementById("panel-1").hidden).toBe(true);
    expect(tab1.tabIndex).toBe(-1);
  });

  it("wraps around and supports Home and End", () => {
    const w = loadPage("index.html");
    const d = w.document;
    key(w, d.getElementById("tab-1"), "ArrowLeft");
    expect(d.activeElement.id).toBe("tab-3");
    key(w, d.activeElement, "Home");
    expect(d.activeElement.id).toBe("tab-1");
    key(w, d.activeElement, "End");
    expect(d.activeElement.id).toBe("tab-3");
  });
});

describe("button", () => {
  it("a button with aria-disabled stays focusable but its click does nothing", () => {
    const w = loadPage("index.html");
    const btn = w.document.querySelector('.ds-button[aria-disabled="true"]');
    let clicked = false;
    btn.addEventListener("click", () => { clicked = true; });
    btn.click();
    expect(clicked).toBe(false);
    btn.focus();
    expect(w.document.activeElement).toBe(btn);
  });
});

describe("dialog", () => {
  it("opens, closes with Escape and returns focus to the opener", () => {
    const w = loadPage("index.html");
    const d = w.document;
    const opener = d.querySelector('[data-dialog-open="cancel-dialog"]');
    const dialog = d.getElementById("cancel-dialog");
    opener.click();
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(dialog.contains(d.activeElement)).toBe(true);
    expect(d.activeElement.textContent).toBe("Keep claim"); // safe choice first
    key(w, dialog, "Escape");
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(d.activeElement).toBe(opener);
  });
});

describe("form validation", () => {
  it("shows a text error, sets aria-invalid and links the error to the field", () => {
    const w = loadPage("index.html");
    const d = w.document;
    const errors = w.DS.validateForm(d.getElementById("demo-form"));
    const input = d.getElementById("policy");
    expect(errors).toHaveLength(1);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(d.getElementById("policy-error").textContent).toBe("Enter your policy number");
    expect(input.getAttribute("aria-describedby")).toContain("policy-error");
  });

  it("checks the format and clears the error once the value is valid", () => {
    const w = loadPage("index.html");
    const d = w.document;
    const input = d.getElementById("policy");
    input.value = "12ab";
    w.DS.validateForm(d.getElementById("demo-form"));
    expect(d.getElementById("policy-error").textContent).toBe("Policy number must be 8 digits");
    input.value = "12345678";
    expect(w.DS.validateForm(d.getElementById("demo-form"))).toEqual([]);
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(d.getElementById("policy-error").textContent).toBe("");
  });
});
