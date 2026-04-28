/**
 * Builds an SVG sprite from selected Lucide icons and a minimal auto-loader.
 *
 * The sprite file (farmacia-ds-icons.svg) lives alongside the CSS/JS in dist/.
 * Consumers use <svg><use href="farmacia-ds-icons.svg#icon-name"/></svg> or
 * the convenience attribute <i data-lucide="icon-name"></i> (handled by the
 * existing farmacia-ds.js).
 *
 * Usage:  node scripts/build-icons.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Icons used on the landing page ────────────────────────────────────────
// Keyed by the name lucide uses in its ESM exports.
const ICONS = [
  // Nav / UI
  "menu",
  "search",
  "external-link",
  "x",
  "chevron-right",
  "chevron-down",
  "arrow-right",
  "arrow-up",
  "arrow-down",
  "download",
  "copy",
  "check",
  "plus",
  "settings",
  "mail",
  "eye",
  "eye-off",

  // Sections
  "palette",
  "type",
  "ruler",
  "square",
  "rectangle-vertical",
  "panel-top",
  "table",
  "code",
  "layout-dashboard",
  "file-text",

  // Semantic (alerts)
  "circle-check",
  "triangle-alert",
  "circle-alert",
  "info",

  // Pharmacy / Health
  "pill",
  "pill-bottle",
  "flask-conical",
  "beaker",
  "test-tube",
  "test-tubes",
  "hospital",
  "droplet",
  "briefcase-medical",
  "graduation-cap",

  // Stats / Data
  "users",
  "flask-round",
  "book-open",
  "trending-up",
  "trending-down",

  // Cards
  "microscope",
  "clipboard-list",
  "activity",

  // Navigation
  "log-in",
  "log-out",
  "building",
  "book",
  "file",
  "layers",

  // Email section
  "send",
  "bell",
  "message-square",
  "calendar",
];

// ── Build sprite ──────────────────────────────────────────────────────────
const LUCIDE_ESM = resolve(
  ROOT,
  "node_modules",
  "lucide",
  "dist",
  "esm",
  "icons"
);

// ViewBox and stroke attributes lucide uses
const SVG_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

let defs = [];
let missing = [];

for (const name of ICONS) {
  const filePath = resolve(LUCIDE_ESM, `${name}.mjs`);
  if (!existsSync(filePath)) {
    missing.push(name);
    continue;
  }

  const raw = readFileSync(filePath, "utf8");

  // Extract the array of [tagName, attrsObject] from the default export.
  // The lucide ESM files look like:
  //   const Pill = [["path",{d:"..."}],["path",{d:"..."}]];
  //   export { Pill as default };
  const match = raw.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*export/);
  if (!match) {
    missing.push(name);
    continue;
  }

  let body = match[1];

  // Convert lucide's single-quoted JS to JSON:
  //   ["path", { d: '...' }]  →  ["path", { "d": "..." }]
  // Step 1: quote unquoted property keys
  body = body.replace(/([{,]\s*)([a-zA-Z]\w*)(\s*:)/g, '$1"$2"$3');
  // Step 2: replace single quotes with double quotes (lucide uses single quotes for attr values)
  body = body.replace(/'/g, '"');

  let elements;
  try {
    elements = JSON.parse(body);
  } catch {
    missing.push(name);
    continue;
  }

  const children = elements
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `    <${tag} ${attrStr}/>`;
    })
    .join("\n");

  defs.push(`  <g id="${name}">\n${children}\n  </g>`);
}

// ── Write sprite file ────────────────────────────────────────────────────
const sprite = `<svg ${SVG_ATTRS} style="display:none">
${defs.join("\n")}
</svg>
`;

const outDir = resolve(ROOT, "dist", "latest");
const outPath = resolve(outDir, "farmacia-ds-icons.svg");
writeFileSync(outPath, sprite, "utf8");

console.log(`✓ Wrote ${outPath}`);
console.log(`  ${ICONS.length - missing.length} icons bundled`);
if (missing.length) {
  console.warn(`  ⚠ ${missing.length} icons not found in lucide: ${missing.join(", ")}`);
}