---
paths:
  - "src/content/docs/capture/**"
  - "src/assets/capture/**"
---

# Voice and tone: Otto Capture

Writing guidance specific to Otto Capture support docs. Load alongside `.claude/rules/shared/voice-common.md` and `.claude/rules/shared/brand-audience.md` (rendered from the shared-rules repo). Where this file and those differ, this file wins for Capture docs.

## Client-facing register

Support pages are written for practice staff, including the pages that describe client-facing features. `client-submission-page.mdx` is correct to talk about the review queue, the organisation prefix, and admin-only actions: the reader is the practice, and the page is telling them how to run a feature their clients use.

Two narrower things do need the plain register.

**The copy a client actually reads.** The submission page itself and the WhatsApp replies live in the product repo, not here. Where a support page quotes or specifies that copy, hold it to the client register: no nominal codes, no document statuses, no platform vocabulary, no mention of publishing. Describe what happens to their photo in the words they would use.

**A client arriving from a search engine.** Someone may search for how to send a receipt to their accountant and land on a page written for the practice. Don't rewrite the page for them, but don't make the opening sentence assume they already know what Capture is. See `.claude/rules/shared/brand-audience.md`.

## Otto and the AI in Capture

Capture's extraction is powered by a third-party LLM, but the reader rarely needs to know that. Otto is the persona who reads, extracts, classifies, matches, and suggests. Implementation is not the story.

- **Otto does the bookkeeping, Capture does the plumbing.** The test is whether the task would exist with a paper ledger. Reading a document, extracting the detail, matching the supplier, deciding the document type, suggesting the coding, posting the bill, attaching the original: all things a bookkeeper does, so all Otto. Connecting and authorising, syncing and refreshing reference data, asking the platform what it permits, checking connections, revoking access, holding files, setting statuses: none of that exists without a cloud ledger, so all Capture.

  Getting this wrong stretches the persona somewhere it doesn't belong. "Otto syncs your chart of accounts" makes Otto sound like an integration rather than a bookkeeper, and it spends the persona on a sentence that gains nothing from it.

- **Otto is the subject for the work on a document:** "Otto reads each document", "Otto extracts the supplier name and line items", "Otto matches the supplier against your existing contacts", "Otto classifies the document type", "Otto suggests nominal codes based on the document content", "Otto provides reasoning for each extracted field".
- **"Capture" for software and UI subjects:** "Capture stores documents in encrypted cloud storage", "Capture does not modify existing bills or invoices".

Avoid "our AI", "the AI", "Otto's AI", "the machine learning model", and "Otto Capture's AI" in running prose. Don't split the persona; Otto does the work.

**Narrow exception: transparency pages.** Security and privacy pages may name the AI provider or routing layer as a fact about how Otto works, e.g. "Otto's extraction runs under a zero-data-retention policy, so your documents are not stored by the provider or used to train a model". Otto stays the subject; any provider name is a disclosure, not a replacement.

## What Capture does and does not do

Capture extracts document data and suggests coding. It is not a compliance tool, and docs should not imply otherwise.

- Otto does not validate or verify VAT numbers, and does not check them against HMRC.
- Otto does not reason about VAT law or ground tax rates in legislation. He extracts the figures shown on the document; the practice remains responsible for VAT treatment.
- Account-code suggestions draw on the client's own past coding, not a fixed rulebook, and they are suggestions Otto offers for review, not decisions. Keep the "Otto doesn't always get it right, every field is editable during review" framing. The term in prose is **nominal code**, not "account code": see `.claude/rules/shared/brand-audience.md` for the platform vocabulary mapping and when a vendor's own word is correct instead.

Don't put internal extraction-accuracy or eval figures in the docs. The honest framing is that Otto is not infallible and the reader reviews before publishing, which the voice already supports. Where docs describe the evaluation work itself (transparency, security, and data pages), state the opt-in basis: by default no client documents are used, and a document is included only when the practice has specifically given permission for it.

## Capture-specific terminology

| Term                                                | Usage                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `organisation`                                      | Used for both the practice (Capture organisation) and its clients (accounting platform organisation). Disambiguate in context.                                                                                                                                                                  |
| `nominal code`                                      | The code a line is posted to. The neutral term, used on shared pages. Xero's own word is account code, FreeAgent's is category, and QuickBooks Online labels the column Category; use the vendor's word on that vendor's platform page, and name both where the reader has to map between them. |
| `client`                                            | A business served by the practice, represented as a client record in Capture.                                                                                                                                                                                                                   |
| `review queue`, `review screen`, `review interface` | Names for the review UI.                                                                                                                                                                                                                                                                        |
| `extraction`                                        | What Otto does to pull structured data from a document. Not "parsing", "reading" (as a noun), or "OCR".                                                                                                                                                                                         |
| `triage`                                            | First pipeline stage: document classification and validity check.                                                                                                                                                                                                                               |
| `processing pipeline`                               | The full sequence of stages (triage, extraction, validation, contact matching, finalise).                                                                                                                                                                                                       |

### UI states and labels

Proper-noun UI states are capitalised: `Draft`, `Submitted`, `Authorised`, `Needs review`, `Needs classification`, `Needs manual split`, `Published`, `Publish failed`, `Quarantined`, `Discarded`. Bold when referring to them as states (`**Needs classification**`) or as buttons or labels (`Click **Publish**`).

## Page patterns

### Getting-started and setup pages

1. One or two sentence prose intro explaining what the page covers. This is a natural place for a small warmth move.
2. `<Steps>` block for the main ordered setup.
3. Short explanatory subsections for each concept the reader meets (e.g. "Email prefix", "Default bill state").
4. Screenshot after the section that introduces the UI.
5. Closing "Next steps" list linking to adjacent pages.

### Reference pages (settings, data lists, statuses)

1. One sentence prose intro.
2. Tables for enumerated data (fields, formats, statuses) with concise explanations.
3. Minimal prose between tables. Keep warmth to a minimum here; readers are scanning for specifics.
4. Include a "what Capture does NOT do" section where relevant. Honest limits are part of the page, not a disclaimer.

### Conceptual guides (how-it-works pages)

1. Short prose intro framing the concept. A good spot to show Otto at work: what he does at this stage, in a sentence or two.
2. Numbered or named stages when describing a pipeline.
3. `<Aside>` sparingly, for genuine caveats.

### FAQ pages

1. Related questions grouped under H2 sections.
2. Questions as full H3 headings in natural form.
3. Short, direct answers, typically one to three short paragraphs.

## Handling in-flux features

Capture is in active development. For features that are planned, partial, or likely to change:

- **Planned, not yet available:** Mark as "coming soon" in prose, or use `<Aside type="caution">` if it materially affects how the reader should act now.
- **Available but changing:** Prefer not to document until stable. If necessary, use `<Aside type="caution">` noting that the feature may change.
- **Removed or deprecated:** State plainly that it is no longer available, link to the replacement, add a redirect if the URL is going.

Avoid specific future dates. They go stale.

## Capture-flavoured before and after

### "The AI" to Otto as the actor, with a little warmth

Avoid:

> The AI reads each document and extracts structured data. This is the core of the pipeline.

Prefer:

> Otto reads the document and extracts the structured data. This is where he does most of his thinking.

### Flat reference to Otto voice

Avoid:

> Documents occasionally take longer to process if the queue is busy.

Prefer:

> Otto works through documents in the order they arrive, so things can take a little longer when the queue is busy.

### Honest admission with warmth

Avoid:

> If the extracted data is incorrect, users can edit any field during review.

Prefer:

> Otto doesn't always get it right, especially with unfamiliar suppliers. Every field is editable during review, so you can put things straight before publishing.

## Exemplar pages

The Capture voice migration is complete (2026-04-24). These pages reflect the agreed voice:

- `src/content/docs/capture/getting-started/configuring-clients.mdx`
- `src/content/docs/capture/guides/reviewing.mdx`
- `src/content/docs/capture/faq.mdx`

For additional tone cues, Bank Rec carries the voice comprehensively across reference, conceptual, and narrative content:

- `src/content/docs/bank-rec/portal/settings.mdx`
- `src/content/docs/bank-rec/getting-started/making-the-most-of-your-trial.mdx`
