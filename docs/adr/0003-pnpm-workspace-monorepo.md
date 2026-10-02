# 0003. Use a pnpm workspace monorepo

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Today we have one app (mobile) plus the Supabase project. Later we may add a web app (public Kilo links and profiles) and shared TypeScript (validation schemas, pace and unit conversions).

## Options

### Single Expo project at the repo root, with `supabase/` alongside
- For: simplest setup; no workspace tooling.
- Against: adding a web app or shared package later means moving everything — a disruptive restructure.

### pnpm workspace: `apps/mobile`, `supabase/`, `packages/*` when needed
- For: room to grow without restructuring later; recent Expo SDKs support monorepos out of the box; pnpm is fast and strict about dependencies.
- Against: slightly more initial config (Metro and workspace settings); occasional native-dependency hoisting issues with pnpm (fixable with `node-linker=hoisted` if needed).

### Workspace + Turborepo
- For: cached task running across packages.
- Against: overkill for one app. Add it when CI gets slow.

## Decision

pnpm workspace with `apps/mobile` and `supabase/`. No `packages/` until there's a second consumer; no Turborepo yet.

## Consequences

- One install, one lockfile, room for `apps/web` and `packages/shared` later.
- Revisit Turborepo once CI takes more than about 5 minutes.
