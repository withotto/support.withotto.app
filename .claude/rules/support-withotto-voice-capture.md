---
paths:
  - "src/content/docs/capture/**"
  - "src/assets/capture/**"
---

# Voice and tone: Otto Capture

Writing guidance specific to Otto Capture support docs. Load alongside `support-withotto-voice-common.md`.

## Otto and the AI in Capture

Capture's extraction is powered by a third-party LLM, but the reader rarely needs to know that. Otto is the persona who reads, extracts, classifies, matches, and suggests. Implementation is not the story.

- **Otto is the subject for every action on a document:** "Otto reads each document", "Otto extracts the supplier name and line items", "Otto matches the supplier against your existing contacts", "Otto classifies the document type", "Otto suggests account codes based on the document content", "Otto provides reasoning for each extracted field".
- **"Capture" for software and UI subjects:** "Capture stores documents in encrypted cloud storage", "Capture does not modify existing bills or invoices".

Avoid "our AI", "the AI", "Otto's AI", "the machine learning model", and "Otto Capture's AI" in running prose. Don't split the persona; Otto does the work.

**Narrow exception: transparency pages.** Security and privacy pages may name the AI provider as a fact about how Otto works, e.g. "Otto uses Google's Gemini API for extraction, with a no-training agreement that keeps your documents out of the training set". Otto stays the subject; the provider name is a disclosure, not a replacement.

## Capture-specific terminology

| Term                                                | Usage                                                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `organisation`                                      | Used for both the practice (Capture organisation) and its clients (accounting platform organisation). Disambiguate in context. |
| `client`                                            | A business served by the practice, represented as a client record in Capture.                                                  |
| `review queue`, `review screen`, `review interface` | Names for the review UI.                                                                                                       |
| `extraction`                                        | What Otto does to pull structured data from a document. Not "parsing", "reading" (as a noun), or "OCR".                        |
| `triage`                                            | First pipeline stage: document classification and validity check.                                                              |
| `processing pipeline`                               | The full sequence of stages (triage, extraction, validation, contact matching, finalise).                                      |

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

1. Short prose intro framing the concept. A good spot for Otto's point of view.
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
