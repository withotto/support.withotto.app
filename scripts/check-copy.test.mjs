import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkText, proseLines } from "./check-copy.mjs";

/** The rule ids found in a page, in order. */
const ids = (text) => checkText(text, "page.mdx").map((f) => f.rule.id);

describe("proseLines", () => {
  it("keeps only title and description from the frontmatter", () => {
    const lines = proseLines(
      "---\ntitle: A — B\ndescription: About it\nsidebar: x\n---\nBody",
    );
    assert.deepEqual(
      lines.map((l) => l.line),
      [2, 3, 6],
    );
  });

  it("skips imports and fenced code", () => {
    const lines = proseLines(
      'import x from "y";\n```\nnames the client\n```\nProse',
    );
    assert.deepEqual(
      lines.map((l) => l.text),
      ["Prose"],
    );
  });
});

describe("names-verb", () => {
  it("flags names and naming used as a verb", () => {
    assert.deepEqual(ids("The heading names the client."), ["names-verb"]);
    assert.deepEqual(ids("A reply, naming the client."), ["names-verb"]);
    assert.deepEqual(ids("The bar names what each action does."), [
      "names-verb",
    ]);
  });

  it("leaves names as a noun alone", () => {
    assert.deepEqual(ids("The names each platform uses differ."), []);
    assert.deepEqual(ids("Contact names are already taken."), []);
    assert.deepEqual(ids("Their names appear on the card."), []);
  });

  it("ignores inline code", () => {
    assert.deepEqual(ids("Run `names the client` here."), []);
  });
});

describe("tells", () => {
  it("flags phrases from the list to avoid", () => {
    assert.deepEqual(ids("It works seamlessly."), ["tells"]);
    assert.deepEqual(ids("description: The AI extraction pipeline"), ["tells"]);
  });

  it("allows the AI provider", () => {
    assert.deepEqual(ids("No one at the AI provider reviews them."), []);
  });
});

describe("em-dash", () => {
  it("flags an em dash in a sentence", () => {
    assert.deepEqual(ids("Otto reads it — then waits."), ["em-dash"]);
  });

  it("allows one in a title", () => {
    assert.deepEqual(ids("---\ntitle: Xero — setup\n---\n"), []);
  });
});

describe("spaced-hyphen", () => {
  it("flags a spaced hyphen between words", () => {
    assert.deepEqual(ids("Duplicate - already uploaded"), ["spaced-hyphen"]);
  });

  it("leaves list markers alone", () => {
    assert.deepEqual(ids("- First item"), []);
  });
});

describe("link-slash", () => {
  it("flags internal links without a trailing slash", () => {
    assert.deepEqual(ids("See [FAQ](/capture/faq)."), ["link-slash"]);
    assert.deepEqual(ids("See [it](/capture/faq#billing)."), ["link-slash"]);
    assert.deepEqual(ids('<LinkButton href="/capture">Go</LinkButton>'), [
      "link-slash",
    ]);
  });

  it("passes links with a trailing slash, files and external links", () => {
    assert.deepEqual(ids("See [FAQ](/capture/faq/)."), []);
    assert.deepEqual(ids("See [it](/capture/faq/#billing)."), []);
    assert.deepEqual(ids("See [it](/llms.txt)."), []);
    assert.deepEqual(ids("See [it](https://example.com/a)."), []);
    assert.deepEqual(ids("See [the home page](/)."), []);
  });
});

describe("small-number", () => {
  it("warns on a lone digit before a word", () => {
    const [finding] = checkText("In the last 2 months.", "page.mdx");
    assert.equal(finding.rule.id, "small-number");
    assert.equal(finding.rule.level, "warn");
  });

  it("allows money, percentages, units, times and the UI's own text", () => {
    assert.deepEqual(ids("It costs £5 a month."), []);
    assert.deepEqual(ids("About 3% of lines."), []);
    assert.deepEqual(ids("Up to 20 MB, or 5 MB each."), []);
    assert.deepEqual(ids("Click **Add 1 client**."), []);
    assert.deepEqual(ids('It reads "5 of 6" here.'), []);
    assert.deepEqual(ids("Between 9:00 and 10:00 each day."), []);
  });
});

describe("checkText", () => {
  it("reports the line and column", () => {
    const [finding] = checkText("Intro\nThe heading names the day.", "p.mdx");
    assert.equal(finding.line, 2);
    assert.equal(finding.column, 13);
  });
});
