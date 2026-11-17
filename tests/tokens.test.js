import { describe, it, expect } from "vitest";
const { contrastRatio, checkTokens } = require("../scripts/contrast");
const { read } = require("./helpers");

const tokens = JSON.parse(read("tokens/tokens.json"));

describe("WCAG contrast formula", () => {
  it("black on white is 21:1", () => expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5));
  it("same colour is 1:1", () => expect(contrastRatio("#1F4E8C", "#1F4E8C")).toBeCloseTo(1, 5));
  it("#767676 on white just passes 4.5:1 (well-known reference value)", () =>
    expect(contrastRatio("#767676", "#FFFFFF")).toBeGreaterThanOrEqual(4.5));
  it("#777777 on white just fails 4.5:1", () => expect(contrastRatio("#777777", "#FFFFFF")).toBeLessThan(4.5));
  it("rejects invalid colours", () => expect(() => contrastRatio("blue", "#FFFFFF")).toThrow());
});

describe("design tokens", () => {
  it("every documented colour pair meets WCAG 2.2 AA", () => {
    const failures = checkTokens(tokens).filter((r) => !r.pass);
    expect(failures).toEqual([]);
  });

  it("generated tokens.css contains every colour token with the right value", () => {
    const css = read("css/tokens.css");
    for (const [name, t] of Object.entries(tokens.color)) {
      expect(css).toContain(`--ds-color-${name}: ${t.value};`);
    }
  });

  it("minimum target size is at least 24px (WCAG 2.5.8)", () => expect(parseInt(tokens.target.min, 10)).toBeGreaterThanOrEqual(24));
});
