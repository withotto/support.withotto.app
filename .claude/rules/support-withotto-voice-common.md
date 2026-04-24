---
paths:
  - "src/content/docs/**"
  - "src/assets/**"
---

# Voice and tone: common

Shared writing guidance for all support content. Load alongside one of the product-specific voice files when editing content under `src/content/docs/capture/` or `src/content/docs/bank-rec/`.

## Audience

The reader is a bookkeeper or accountant at a practice, using With Otto's products in their day-to-day work. Assume:

- **Financial domain knowledge is high.** Do not explain bills, invoices, VAT, nominal codes, chart of accounts, reconciliation, or accounting platform concepts.
- **Technical knowledge is variable.** Explain OAuth, MX records, DNS, SPF/DMARC, malware scanning, and similar in plain English when they come up.
- **They read in a hurry.** The opening sentence of a page should answer "what is this page for". Subheadings should be scannable.

## Core voice principles

With Otto's docs are warm but functional. Otto is an active persona, not just a product name, and the writing treats him as a member of the practice's team who happens to live inside the software. The warmth is what distinguishes With Otto from big, faceless competitors, but it never gets in the way of the reader finding the answer.

1. **Otto is the protagonist.** He has a schedule, preferences, and a way of working. Write about him in the third person, as if describing a new employee.
2. **Measured warmth.** Light metaphors, occasional rhetorical openers, and small asides are welcome where they land. Do not force them. Do not stack them. One or two lifts per page is typical; reference-heavy pages stay leaner.
3. **Matter of fact.** Say what Otto does and what the reader should do. Skip claims about benefits, philosophy, or the importance of the task.
4. **Honest about limits.** If a feature has caveats, state them. If something is not supported, say so directly. Sections like "what Capture does not modify" or "incorrect reconciliations are not charged" are features of the docs, not footnotes.
5. **Concrete over abstract.** Prefer specific verbs (extracts, reads, matches, reconciles, creates) over generic ones (handles, manages, supports).
6. **Short sentences.** One idea per sentence where possible. Split compound sentences that run past roughly 25 words.
7. **Active voice.** "Otto reads the document" beats "The document is read by Otto".

## Otto as a persona

- **Otto is not a real person.** He does not attend events, meet anyone, or exist outside the product. He is a persona within the software. Keep all framing consistent with that.
- **Otto takes male pronouns:** he, him, his, himself.
- **"Otto" on first mention per page,** then `he` or `him` once context is set.
- **Never use "I" or "me" as Otto.** Otto is not the narrator. The author is.

### What Otto does and doesn't do

Otto's persona extends only to things the software actually does.

- **Good:** "Otto reconciles matches in Xero", "Otto reads each document", "Otto keeps a watchful eye on your reconciliation schedule".
- **Good:** "Otto doesn't need a computer, a branded notepad, or annual leave." The joke works because it contrasts Otto with a real employee; it does not claim Otto exists physically.
- **Avoid:** "Otto will attend your team meeting", "Otto sent birthday cards", "Otto has worked at practices for decades". Anything implying physical presence or independent existence.

## "We" is the With Otto team

"We" is the team behind the product, not Otto. Used freely where the team's voice is the right one.

- "We'll let Otto know he was correct."
- "We do what we can to avoid this."
- "We don't like pushy sales processes."
- "Please contact support if..."

## Conversational moves that fit

Used sparingly, these lifts make the docs feel distinctive rather than generic.

- **Light metaphors.** "Goldilocks and her porridge", "all-you-can-eat buffet", "like another employee".
- **Self-aware asides.** "Maybe we're a _little_ biased", "we won't judge!", "(and he's naturally very cautious)".
- **Rhetorical openers with direct answers.** "You might be thinking: _Huh? Why would I need to set this?_ Glad you asked!".
- **Strikethrough for tongue-in-cheek corrections.** `Here are the ~buffet rules~ trial suggestions`.
- **Honest admissions.** "Sorry. We do what we can to avoid this, but Otto isn't infallible."
- **Rare, well-placed exclamation marks** where the tone lands: "Perfect, just what we're aiming for!", "Win-win!".

## Style moves that do not fit

- Heavy marketing language, superlatives, hype.
- Emoji.
- First-person Otto ("Hi, I'm Otto!").
- Breaking the persona frame (see "What Otto does and doesn't do").
- Stacking asides so the voice dominates the information.

## Punctuation and mechanics

- **No em dashes.** Use commas, colons, parentheses, or sentence splits. This applies everywhere, including tables and list labels. An em dash after a bold label (`**Bills** — supplier invoices`) should be a colon (`**Bills:** supplier invoices`).
- **En dashes for numeric ranges only.** `09:00–17:00`, `10–15 clients`. Otherwise prefer "to".
- **Serial comma.** "Contacts, chart of accounts, tax rates, and currencies."
- **Colons for definitional patterns.** `**Label:** explanation.` is the house style for bolded lead-in lists.
- **Bullets.** Sentence-case first word. Complete sentences take periods. Short phrase labels do not.

## Spelling

UK English throughout: `organisation`, `authorise`, `recognise`, `customise`, `analyse`, `colour`, `licence` (noun), `licensed` (adjective).

## Numbers and dates

- **Zero to nine:** spell out. "Three parts", "two billing types", "a few minutes".
- **10 and above:** numerals. "12 months", "100 examples", "15 minutes".
- **Always numerals:** percentages (`90%`), currency (`£5`, `$10`), and time durations when precise (`5 minutes` in a step spec).
- **Don't start a sentence with a numeral.** Rephrase or spell out.
- **Dates in prose:** `24 April 2026`. Avoid numeric-only formats outside UI screenshots.

## Heading case

Sentence case. Capitalise only the first word and proper nouns.

- Good: "Setup steps", "What happens after submission", "Connecting Xero"
- Avoid: "Setup Steps", "What Happens After Submission"

FAQ headings are the exception: full natural questions, e.g. "How do I disconnect a client?".

## Link text

Descriptive link text that reads naturally in the sentence. Avoid "click here" and "this link".

- Good: `See [what Capture does not modify](/capture/guides/data-flow#what-capture-does-not-modify) for details.`
- Avoid: `Click [here](/capture/guides/data-flow#what-capture-does-not-modify) for details.`

## Core terminology

| Term                  | Usage                                                             |
| --------------------- | ----------------------------------------------------------------- |
| `Otto Capture`        | Full product name. First mention per page.                        |
| `Capture`             | Acceptable shorthand after first mention.                         |
| `With Otto`           | The company and brand.                                            |
| `Xero`                | Named when content is Xero-specific.                              |
| `accounting platform` | Generic reference when content applies beyond Xero.               |
| `bank reconciliation` | Prose reference to the Bank Rec product (lowercase, spelled out). |
| `Bank Rec`            | URL and folder shorthand only (`/bank-rec/`).                     |

## Phrases to avoid

LLM tells that leak in easily. Rewrite when spotted.

| Avoid                                          | Prefer                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| seamless, seamlessly                           | "works alongside", or name the specific mechanism                  |
| powerful, robust, revolutionary, cutting-edge  | drop entirely                                                      |
| unlock, empower, leverage                      | name the action ("use", "read", "apply")                           |
| streamline, optimise workflows                 | say what is saved ("cuts manual data entry")                       |
| at your fingertips, in just a few clicks       | drop entirely                                                      |
| It's worth noting that, It's important to note | drop and state the note directly                                   |
| In today's fast-paced world                    | drop entirely                                                      |
| Let's dive in, Let's take a look               | drop entirely                                                      |
| Not only X but also Y                          | state X and Y as two sentences                                     |
| Simply click, Just click                       | "Click"                                                            |
| Our cutting-edge AI                            | "Otto" or the specific action ("Otto extracts…", "Otto suggests…") |

## Before and after

### Product-as-subject to Otto as subject

Avoid:

> The AI reads each document and extracts supplier details, amounts, line items, and tax information.

Prefer:

> Otto reads each document and extracts supplier details, amounts, line items, and tax information.

### Abstract verbs to concrete verbs

Avoid:

> The system handles your receipts by leveraging advanced AI to streamline the entire accounts payable process.

Prefer:

> Otto extracts the supplier, amounts, tax, and line items from each receipt, then publishes a bill to your accounting platform.

### Hype to honest approximation

Avoid:

> Lightning-fast processing means your documents are ready instantly.

Prefer:

> Most documents are processed within a few minutes. Processing time depends on document complexity, image quality, and current queue volume.

### Em dash after bold label to colon

Avoid:

> **Bills** (accounts payable) — supplier invoices, utility bills, receipts

Prefer:

> **Bills** (accounts payable): supplier invoices, utility bills, receipts

### Padding phrases to direct statement

Avoid:

> It's worth noting that Capture does not delete any data in your accounting platform.

Prefer:

> Capture does not delete any data in your accounting platform.
