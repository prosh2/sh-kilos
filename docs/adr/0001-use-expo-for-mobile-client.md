# 0001. Use Expo (React Native) for the mobile client

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Two developers need to ship on both iOS and Android. The MVP (Kilos: create, browse, join, chat) is a social app: forms, lists, maps, chat, and push notifications. It doesn't record GPS in the background.

## Options

### Expo (React Native, TypeScript)
- For: one codebase for both platforms; over-the-air updates; EAS builds without managing Xcode/Gradle much; TypeScript shared with Supabase-generated types; mature map, notification, and auth libraries.
- Against: heavy native work (long background GPS recording, watch apps) may need custom native modules later.

### Flutter
- For: consistent rendering; good performance.
- Against: Dart is a separate language from the Supabase/TypeScript tooling; weaker ecosystem for health and fitness integrations.

### Native Swift + Kotlin
- For: best platform integration.
- Against: every feature built twice — not viable for two people.

## Decision

Use Expo with TypeScript (strict mode) and Expo Router.

## Consequences

- Fast iteration, and one language across app, database types, and edge functions.
- If we later add activity recording, revisit background location (expo-location + TaskManager first; a custom native module if that proves unreliable).
