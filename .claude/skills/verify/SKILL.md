---
name: verify
description: Run Kilos quality checks (lint, typecheck, tests, migrations) and report results honestly. Use before saying any code change is done, and after each implementation slice.
---

# Verify

## Steps

1. Find the commands. Check the **Commands** section of `CLAUDE.md` and the scripts in the root `package.json`. If neither has them yet (before Phase 1), say so plainly. Don't make up commands.
2. Run, in order, stopping to fix failures caused by your change:
   - lint
   - typecheck
   - unit tests
   - if migrations changed: reset the local database and apply migrations from scratch, regenerate Supabase types, run the RLS policy tests
3. If the change is UI-visible and you can run the app, check the affected screen too.

## Reporting

- List what passed, what failed (with the relevant output), and what was skipped and why.
- Never call work "done" or "working" while a check is failing or was skipped without saying so.
- Don't disable, skip, or loosen a test or lint rule to make a check pass unless the user agrees.
- End with a short summary of the files changed, so the user can review and commit them. Don't run git.
