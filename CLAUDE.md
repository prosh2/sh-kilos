# Kilos

Social training app for endurance athletes — runners, cyclists, swimmers, triathletes, duathletes.
MVP: athletes post **Kilos** (invitations to train together), others browse, join, and chat in the Kilo's group.

Small team of two — keep things simple, avoid infrastructure we have to babysit.

## Where things are

- Product: `docs/product/vision.md` (scope + non-goals), `docs/product/glossary.md` (use these terms in code)
- Architecture: `docs/architecture/overview.md`, decisions in `docs/adr/`
- Plan: `docs/roadmap.md`

Read the relevant ADRs before proposing structural changes. If a change contradicts an accepted ADR, say so and propose a new ADR rather than silently diverging.

## Stack

- Mobile: Expo (React Native, TypeScript) — ADR 0001
- Backend: Supabase (Postgres + PostGIS, Auth, Realtime, Storage) — ADR 0002
- Repo: pnpm workspace monorepo (`apps/mobile`, `supabase/`) — ADR 0003
- Kilo chat: `kilo_messages` table + Supabase Realtime — ADR 0004
- Sign-in: email one-time code only — ADR 0005
- UI: own design tokens (`apps/mobile/src/theme`) + `StyleSheet`, Inter, Lucide icons — ADR 0006

## Commands

pnpm is pinned in the root `package.json` (`packageManager`); run it through corepack (`corepack pnpm …`) or after `corepack enable`. Run from the repo root.

- Install: `pnpm install`
- Dev server: `pnpm dev` (then press `i` for iOS simulator / `a` for Android)
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Format: `pnpm format` (writes) / `pnpm format:check`, which cover `apps/` only
- Add a mobile dependency: from `apps/mobile`, `pnpm expo install <pkg>` (picks SDK-compatible versions)

_Still to add in Phase 1: test, db reset, Supabase type generation._

## Working agreements

- **Git is done by humans.** Never run git commands that write (add, commit, push, branch, rebase, reset, stash). Read-only git (status, diff, log) is fine. When work is ready, summarise what changed so a human can commit it.
- **Explain tradeoffs before major decisions.** New dependencies, schema shape, auth, infra, or anything hard to reverse: present options + tradeoffs + a recommendation, wait for sign-off, then record it with the `adr` skill.
- **Spec before code** for features — use the `feature-spec` skill.
- **Mobile UI work** (screens, routes, components) follows the `mobile-screen` skill.
- **Safety and privacy are product features.** Strangers meet in person through this app. Any change touching user data, location, visibility, messaging, or joining goes through the `safety-privacy-review` skill.
- **Verify before declaring done** — use the `verify` skill and report failures honestly.
- Database security lives in Postgres Row Level Security, not only in the client. Every new table gets RLS policies in the same migration.

## Conventions

- TypeScript strict mode everywhere. No `any` without a comment explaining why.
- Use glossary terms in names (`kilo`, `host`, `participant`, `meeting point`), not synonyms (`event`, `meetup`, `organizer`).
- Distances in UI are always `km` — never "kilo(s)", which means the invitation (see glossary).
- Store times as `timestamptz` (UTC); display in the user's time zone. Store distances in metres, durations in seconds; convert only at display.
