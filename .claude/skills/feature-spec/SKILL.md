---
name: feature-spec
description: Write a short spec for a Kilos feature before implementing it. Use when starting any user-facing feature or roadmap item (e.g. "build Kilo creation", "add join flow"), before writing code.
---

# Feature spec

Write a short spec to `docs/specs/<kebab-feature-name>.md`, get the user to agree to it, then implement it.

## Steps

1. Read `docs/product/vision.md`, `docs/product/glossary.md`, `docs/roadmap.md`, and any related ADRs or specs.
2. If the feature is outside MVP scope (see the non-goals), say so before going any further.
3. Draft the spec using the template below. Use glossary terms throughout.
4. Put any product questions under **Open questions** rather than guessing. Ask the user about the ones that block implementation.
5. If the spec needs a hard-to-reverse technical choice, use the `adr` skill for it.
6. Once the user approves, implement in small vertical slices (migration → RLS → types → UI), running the `verify` skill after each slice.

## Template

```markdown
# <Feature>

**Roadmap phase:** N · **Status:** Draft | Approved | Done

## User story
As a <host / participant / athlete>, I want … so that …

## Acceptance criteria
- [ ] Concrete, testable behaviour (including empty, error, and loading states)

## Data changes
Tables/columns, indexes, RLS policies (who can select/insert/update/delete and why).

## Screens & flows
Brief list or ASCII sketch. Note what happens when the user is offline or the data is out of date.

## Safety & privacy
Output of the `safety-privacy-review` skill, or "none — reason".

## Notifications
What push notifications this feature triggers, if any.

## Test plan
Unit, RLS policy, and manual checks.

## Open questions
```

Keep the whole spec under about one page. A spec that's too long to review won't get reviewed.
