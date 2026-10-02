# 0004. How to implement Kilo chat

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Once athletes join a Kilo, they need to talk ("where exactly are we meeting?", "running 5 min late"). Chat is the most complex MVP feature, and in practice athletes in this market already use Telegram and WhatsApp groups.

## Options

### A. Build on Supabase (a `kilo_messages` table + Realtime)
- For: no extra vendor or cost; messages live alongside Kilos, so RLS ("participants only") and blocking work the same way as everywhere else; we own the engagement and the moderation data.
- Against: we build everything ourselves — pagination, unread counts, push on new message, offline/optimistic sending. Typing indicators and read receipts are extra work.

### B. Hosted chat SDK (Stream, Sendbird, etc.)
- For: polished UI components, read receipts, moderation tools, and push notifications out of the box.
- Against: monthly cost that grows with users; a second source of truth for users and permissions that we have to keep in sync with Supabase; vendor lock-in for a core feature.

### C. Link out — the host pastes a Telegram/WhatsApp group link
- For: no build cost; athletes already use these apps; we can ship the MVP sooner.
- Against: conversation and engagement leave Kilos; we can't moderate or apply blocks; anyone with the link can join, which bypasses capacity and approval; a weaker product story.

## Recommendation

Start with **A, kept minimal**: plain text messages, newest first, push notification on new message, and nothing else. It keeps safety controls (blocking, reporting, participants only) inside one system, which matters when strangers are arranging to meet. Option C could be a stopgap if we want to ship the browse/join loop before chat is ready.

## Decision

Option A, kept minimal: a `kilo_messages` table protected by RLS (participants only, blocks respected), delivered via Supabase Realtime, with a push notification on new messages. Plain text only for MVP. Option C (link out) stays available as a stopgap if chat slips behind the browse/join loop.
