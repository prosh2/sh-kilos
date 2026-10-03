# Roadmap

No target date yet. The phases are ordered so that each one leaves us with something we can run.

## Phase 0 — Foundation ✅ in progress

- [x] Context docs (CLAUDE.md, vision, glossary, architecture, ADRs)
- [x] Claude Code skills + shared settings
- [ ] Settle the open decisions below

## Phase 1 — Skeleton

- [ ] pnpm workspace, Expo app (TypeScript strict, Expo Router), ESLint + Prettier
- [ ] Local Supabase (`supabase start`), first migration, generated TS types
- [ ] Sign-in with email one-time code (ADR 0005), profile created when an athlete signs up
- [ ] CI on PRs: lint, typecheck, test, and a check that migrations apply cleanly
- [ ] Fill in the commands in CLAUDE.md; add the `db-migration` and `run` skills

## Phase 2 — Create a Kilo

- [ ] Set up a profile (name, avatar, sports)
- [ ] Create, edit, and cancel a Kilo (pick the meeting point on a map)
- [ ] My Kilos screen (hosting / joined)

## Phase 3 — Browse & join

- [ ] Browse list, with filters for sport, date, distance from me, and pace
- [ ] Map view (optional for MVP)
- [ ] Kilo detail screen, join and leave, capacity handling

## Phase 4 — Kilo chat & notifications

- [ ] Kilo chat on Supabase Realtime (ADR 0004)
- [ ] Push notifications: someone joined your Kilo, new message, Kilo changed or cancelled, reminder before it starts

## Phase 5 — Safety & beta

- [ ] Block and report, plus a basic moderation queue (can be a Supabase dashboard view)
- [ ] Terms, privacy policy, minimum age rule
- [ ] Internal beta through TestFlight / Play internal testing

## Later

Recurring Kilos, clubs, logging and importing activities, multisport legs, Strava-style feed, web profiles.

## Open decisions

| Decision      | Options                                                                | Needed by                               |
| ------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| Join flow     | Join instantly, require host approval, or let the host choose per Kilo | Phase 3                                 |
| Launch market | Singapore first?                                                       | Phase 2 (units, time zones, map region) |
| Map provider  | Apple/Google native maps through react-native-maps, or Mapbox/MapLibre | Phase 2                                 |
