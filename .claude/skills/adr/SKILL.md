---
name: adr
description: Record an architecture decision in docs/adr/. Use when a choice about stack, dependencies, data model, auth, infra, or anything hard to reverse is being made or has just been agreed — or when the user says "write an ADR" / "record this decision".
---

# Architecture Decision Record

Kilos records every significant decision, together with its tradeoffs, so that the team (and future Claude sessions) know _why_ things are the way they are.

## When the decision isn't made yet

1. Present 2–4 realistic options. For each one, give concrete pros and cons in Kilos terms (two developers, the MVP Kilo loop, safety, cost). Don't make up options just to pad the list.
2. Give a recommendation and say what would change it.
3. **Stop and wait for the user to decide.** Don't write code that assumes the outcome.

## Writing the record

1. List `docs/adr/` and take the next number (4 digits, zero-padded).
2. Copy the structure of `docs/adr/0000-template.md`. File name: `NNNN-imperative-kebab-title.md`.
3. Status is `Accepted` only if the user has explicitly agreed; otherwise `Proposed`. Use today's date.
4. Keep it under about 80 lines. Context explains why we're deciding now; Consequences must include what we're giving up and what would make us revisit the decision.
5. If it replaces an earlier ADR, set the old one's status to `Superseded by NNNN`. Don't delete old ADRs.
6. If the decision changes the stack, layout, or conventions, update `CLAUDE.md` and `docs/architecture/overview.md` to match.
7. Tell the user which files changed so they can commit them. Don't run git.
