// WCAG 2.x contrast ratio helpers (https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio)

function luminance(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Not a 6-digit hex colour: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Checks every pair listed in tokens.json and returns one row per pair. */
function checkTokens(tokens) {
  return tokens.contrastPairs.map((p) => {
    const ratio = contrastRatio(tokens.color[p.fg].value, tokens.color[p.bg].value);
    return { ...p, ratio: Math.round(ratio * 100) / 100, pass: ratio >= p.min };
  });
}

module.exports = { luminance, contrastRatio, checkTokens };
