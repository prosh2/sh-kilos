# 0002. Use Supabase as the backend

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

The MVP needs auth, relational data (Kilos, participants, blocks), location search ("Kilos near me"), realtime chat, push notifications, and avatar storage. Two developers can't afford to run servers.

## Options

### Supabase
- For: Postgres with PostGIS for location queries; Auth; Realtime; Storage; Edge Functions; access rules (RLS) live in the database; good local development (`supabase start`); generated TypeScript types.
- Against: vendor coupling for Auth, Realtime, and Edge Functions; access rules written in SQL policies are easy to get wrong and need testing; Edge Functions aren't suited to long-running jobs.

### Own API (Node/Fastify or Go) + managed Postgres
- For: full control; no vendor coupling.
- Against: we'd build auth, realtime, storage, and run the servers ourselves — weeks of work before any product.

### Firebase
- For: quick start; good realtime support.
- Against: a document database is a poor fit for relational and geographic queries (filtering by distance + sport + date + pace).

## Decision

Use Supabase. The app talks to it directly, with authorisation enforced by RLS. Edge Functions handle server-only work such as push notifications.

## Consequences

- Little to operate; one Postgres schema is the source of truth.
- Every table needs RLS policies plus tests for them. A table without policies is a security bug.
- Escape hatch: the data is plain Postgres. If we outgrow Supabase, we can move the database and replace Auth/Realtime gradually.
