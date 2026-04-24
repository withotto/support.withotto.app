---
paths:
  - "src/content/docs/bank-rec/**"
  - "src/assets/bank-rec/**"
---

# Voice and tone: Bank Rec

Writing guidance specific to bank reconciliation support docs. Load alongside `support-withotto-voice-common.md`.

## Otto and ML in Bank Rec

Bank Rec's SmartMatch is powered by machine learning models trained on each client's historical reconciliations. The persona is that Otto has been trained using those examples, which reads naturally because the training genuinely is per-client and per-feedback.

- **Otto is the subject for most actions:** "Otto reconciles matches", "he checks the bank transaction details", "he decides whether to reconcile".
- **Mention ML and training in explanations of how SmartMatch works:** "SmartMatch is our intelligent reconciliation feature. It is powered by machine learning (ML) models that are trained on each of your clients to ensure Otto understands what he should _and_ **should not** reconcile."
- **"We" for the team's role in training:** "We use 12 months of previous reconciliations...", "each fortnight we add to this by incorporating the latest reconciliations as well as feedback that you have provided".
- **"Otto's confidence", "Otto's decisions"** when describing his state of mind about a match.

## Bank Rec-specific terminology

| Term                               | Usage                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `SmartMatch`                       | AI-powered reconciliation feature. Proper noun, camelCase.                                   |
| `GuidedMatch`                      | Feedback-driven reconciliation feature. Proper noun, camelCase.                              |
| `bank rules`                       | Xero's bank rule feature. Lowercase.                                                         |
| `reconcile`, `reconciliation`      | The core action. Use precisely.                                                              |
| `match` / `non-match`              | Paired terms for Otto's decisions.                                                           |
| `monitor mode` / `monitoring mode` | SmartMatch state where decisions are recorded but not applied.                               |
| `confidence`                       | Otto's confidence score. Used with percentage values.                                        |
| `credits`                          | Billing unit. Reconciliations consume credits.                                               |
| `practice-wide` / `client-level`   | Settings scopes. Hyphenated.                                                                 |
| `machine learning (ML)`            | Acceptable in explanations of how SmartMatch works. Introduce the abbreviation on first use. |

## Related pages convention

Bank Rec pages commonly close with a "Related pages" aside. Preserve this convention when adding new pages.

```mdx
<Aside type="tip" title="Related pages">
  - [Link text](../path) - short description
</Aside>
```

## Wind-down context

Bank Rec is no longer accepting new customers and is expected to sunset by end of 2026. For pages that touch trial signup, pricing, or growth:

- **Prefer existing-customer framing.** "You can up or downgrade your plan" rather than "sign up today".
- **Trial and onboarding content** stays for existing trial customers but is not a marketing surface. `onboarding.mdx` already notes trials are paused.
- **Gratitude and clarity about timelines** over sales language. The broader transition messaging lives on withotto.app, not here.

## Bank Rec-flavoured before and after

### Flat reference tone to Bank Rec voice

Avoid:

> SmartMatch is an intelligent reconciliation feature powered by machine learning models. The system is trained using twelve months of prior reconciliation data and is updated on a fortnightly basis to incorporate new data and user feedback.

Prefer:

> SmartMatch is our intelligent reconciliation feature. It is powered by machine learning (ML) models that are trained on each of your clients to ensure Otto understands what he should _and_ **should not** reconcile. We use 12 months of previous reconciliations from your client's Xero account as his baseline training, and each fortnight we add to this by incorporating the latest reconciliations as well as feedback that you have provided in the portal.

### Product as subject to Otto as subject

Avoid:

> The system performs reconciliations according to a configurable schedule. If the schedule is changed, the system detects the change and catches up on any missed reconciliations.

Prefer:

> Otto keeps a watchful eye on your reconciliation schedule. If you change your preferred reconciliation time, he'll check each hour to make sure no reconciliations have been missed.

### Sales language to honest warmth

Avoid:

> Take advantage of our powerful trial to maximise value for your practice!

Prefer:

> We think of our trial like an all-you-can-eat buffet where you won't get side-eye for building a container out of food so you can pile as much as possible on your plate.

## Exemplar pages

For Bank Rec voice reference:

- `src/content/docs/bank-rec/getting-started/making-the-most-of-your-trial.mdx`: warm conversational voice
- `src/content/docs/bank-rec/portal/settings.mdx`: reference content carrying the voice
- `src/content/docs/bank-rec/guides/feedback.mdx`: honest acknowledgement of limits
- `src/content/docs/bank-rec/guides/smartmatch.mdx`: ML explained through Otto
