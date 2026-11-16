/**
 * `pnpm check:copy`: the writing rules a script can check, run over every
 * docs page before the build.
 *
 * The rules come from `.claude/rules/shared/voice-common.md` (rendered from
 * withotto/shared-rules) and `.claude/rules/support-withotto-content.md`.
 * Those files stay the authority. Only rules a pattern can apply without
 * judgement are here: an error fails the build, and a warning is printed for
 * a person to decide.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_DIR = "src/content/docs";

/** Blank out a match but keep its length, so columns stay true. */
const blank = (match) => " ".repeat(match.length);

/** Inline code holds UI strings and paths, not prose. */
const withoutCode = (line) => line.replace(/`[^`]*`/g, blank);

/** Bold and quoted text usually quotes the UI, which may use digits. */
const withoutQuotedUi = (line) =>
  withoutCode(line)
    .replace(/\*\*[^*]+\*\*/g, blank)
    .replace(/"[^"]*"/g, blank);

/** The voice rules' phrases with no legitimate use in support copy. */
const TELLS = [
  "cutting[- ]edge",
  "ai[- ]powered",
  "ai[- ]driven",
  "seamless(?:ly)?",
  "effortless(?:ly)?",
  "unleash(?:es)?",
  "unlocks?",
  "supercharges?",
  "empowers?",
  "leverages?",
  "streamlines?",
  "at your fingertips",
  "in just a few clicks",
  "it's worth noting",
  "it's important to note",
  "in today's fast-paced world",
  "let's dive in",
  "let's take a look",
  "not only",
  "simply click",
  "just click",
  "game[- ]changing",
  "revolutionis(?:e|es|ed|ing)",
  "revolutionary",
  "world[- ]class",
  "best[- ]in[- ]class",
  "next[- ]generation",
  "practices who",
  "our ai",
  // "The AI provider" is how the privacy wording refers to the third party.
  "the ai(?! provider)",
];

/**
 * @typedef {{
 *   id: string,
 *   level: "error" | "warn",
 *   pattern: RegExp,
 *   message: string,
 *   prepare?: (line: string) => string,
 *   skip?: (line: string) => boolean,
 * }} Rule
 */

/** @type {Rule[]} */
export const RULES = [
  {
    id: "names-verb",
    level: "error",
    // A verb takes an object; "the names each platform uses" is a noun.
    pattern:
      /(?<!\b(?:the|their|its|your|his|her|our|whose) )\b(?:names|naming)\s+(?:the|a|an|each|every|any|its|your|their|his|her|this|that|these|those|what|which|whose|who|them|it|both|one|you)\b/gi,
    message:
      '"names" for shows, says or lists reads as generated copy. Use the plain verb: shows, says, lists, describes.',
  },
  {
    id: "tells",
    level: "error",
    pattern: new RegExp(`\\b(?:${TELLS.join("|")})\\b`, "gi"),
    message:
      "A phrase from the voice rules' list to avoid. See the table in voice-common.md for what to write instead.",
  },
  {
    id: "em-dash",
    level: "error",
    pattern: /—/g,
    message:
      "No em dashes in sentences. Use a comma, colon, parentheses or a new sentence.",
    // An em dash may divide the parts of a title.
    skip: (line) => /^title:/.test(line),
  },
  {
    id: "spaced-hyphen",
    level: "error",
    pattern: /(?<=\w) - (?=\w)/g,
    message:
      "A spaced hyphen standing in for an em dash. Use a comma, colon, parentheses or a new sentence.",
  },
  {
    id: "link-slash",
    level: "error",
    // Internal page links, in Markdown or an href, whose path doesn't end
    // in "/" before any fragment. A last segment with a dot is a file.
    pattern: /(?:\]\(|href=["'])\/(?:[^)"'#\s]*\/)?[^)"'#\s./]+(?=[#)"'])/g,
    message:
      'Internal links end in "/" before any #fragment, e.g. /capture/faq/.',
  },
  {
    id: "small-number",
    level: "warn",
    // A lone digit before a word. Units, money, times and ranges are allowed.
    pattern:
      /(?<![\w£$€.,:/#–-])[1-9](?![\d%.,:x/–-])(?!\s*(?:MB|GB|KB|px|am|pm)\b)(?=\s+[a-z])/g,
    message:
      "Spell out zero to nine, unless it's a precise time or duration, a technical count, or the UI's own text.",
    prepare: withoutQuotedUi,
  },
];

/**
 * The lines of a page a reader sees as prose, with code blanked out.
 * Frontmatter keeps only `title` and `description`. Imports, exports, fenced
 * code and comments are skipped.
 *
 * @param {string} text
 * @returns {{ line: number, text: string }[]}
 */
export function proseLines(text) {
  const lines = text.split("\n");
  const out = [];
  let inFence = false;
  let inFrontmatter = lines[0]?.trim() === "---";
  for (let i = inFrontmatter ? 1 : 0; i < lines.length; i++) {
    const raw = lines[i];
    if (inFrontmatter) {
      if (raw.trim() === "---") inFrontmatter = false;
      else if (/^(?:title|description):/.test(raw))
        out.push({ line: i + 1, text: raw });
      continue;
    }
    if (/^\s*(?:```|~~~)/.test(raw)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || /^(?:import|export)\s/.test(raw)) continue;
    const text = raw
      .replace(/<!--.*?-->/g, blank)
      .replace(/\{\/\*.*?\*\/\}/g, blank);
    out.push({ line: i + 1, text });
  }
  return out;
}

/**
 * @typedef {{ file: string, line: number, column: number, rule: Rule, excerpt: string }} Finding
 */

/**
 * @param {string} text The page source.
 * @param {string} file The path to report.
 * @param {Rule[]} [rules]
 * @returns {Finding[]}
 */
export function checkText(text, file, rules = RULES) {
  const findings = [];
  for (const { line, text: lineText } of proseLines(text)) {
    for (const rule of rules) {
      if (rule.skip?.(lineText)) continue;
      const prepared = (rule.prepare ?? withoutCode)(lineText);
      for (const match of prepared.matchAll(rule.pattern)) {
        const start = Math.max(0, match.index - 40);
        const end = Math.min(
          lineText.length,
          match.index + match[0].length + 40,
        );
        findings.push({
          file,
          line,
          column: match.index + 1,
          rule,
          excerpt: lineText.slice(start, end).trim(),
        });
      }
    }
  }
  return findings;
}

/** @param {string} dir */
function docsFiles(dir) {
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) => path.join(dir, name))
    .sort();
}

function main() {
  const findings = docsFiles(DOCS_DIR).flatMap((file) =>
    checkText(fs.readFileSync(file, "utf8"), file),
  );
  for (const f of findings) {
    console.log(
      `${f.file}:${f.line}:${f.column}  ${f.rule.level}  ${f.rule.id}  ${f.rule.message}\n    ${f.excerpt}`,
    );
  }
  const errors = findings.filter((f) => f.rule.level === "error").length;
  const warnings = findings.length - errors;
  console.log(
    `check:copy: ${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}`,
  );
  if (errors > 0) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
