// Turns tokens/tokens.json into css/tokens.css and prints a contrast report.
// Run: npm run tokens
const fs = require("fs");
const path = require("path");
const { checkTokens } = require("./contrast");

const root = path.join(__dirname, "..");
const tokens = JSON.parse(fs.readFileSync(path.join(root, "tokens", "tokens.json"), "utf8"));

const lines = ["/* Generated from tokens/tokens.json by scripts/build-tokens.js. Do not edit by hand. */", ":root {"];
for (const [name, t] of Object.entries(tokens.color)) lines.push(`  --ds-color-${name}: ${t.value};`);
for (const [name, v] of Object.entries(tokens.space)) lines.push(`  --ds-space-${name}: ${v};`);
for (const [name, v] of Object.entries(tokens.radius)) lines.push(`  --ds-radius-${name}: ${v};`);
for (const [name, v] of Object.entries(tokens.font)) lines.push(`  --ds-font-${name}: ${v};`);
lines.push(`  --ds-target-min: ${tokens.target.min};`, "}", "");
fs.writeFileSync(path.join(root, "css", "tokens.css"), lines.join("\n"));

const report = checkTokens(tokens);
for (const r of report) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.ratio.toFixed(2)}:1 (min ${r.min})  ${r.fg} on ${r.bg}  - ${r.use}`);
}
const failed = report.filter((r) => !r.pass).length;
console.log(`\n${report.length - failed}/${report.length} colour pairs meet WCAG 2.2 AA. Wrote css/tokens.css`);
process.exitCode = failed ? 1 : 0;
