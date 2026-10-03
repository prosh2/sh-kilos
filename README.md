# Kilos

A social training app for endurance athletes. Post a **Kilo** for your next run, ride, or swim; find people at your pace; train together.

> Early development. The app runs on placeholder data — no backend yet. See [`docs/roadmap.md`](docs/roadmap.md).

## Stack

Expo (React Native, TypeScript, Expo Router) · Supabase (Postgres + PostGIS, Auth, Realtime) · pnpm workspace

## Getting started

Prerequisites: Node.js (current LTS), plus the iOS Simulator (Xcode) or an Android emulator — or Expo Go on a phone.

```sh
corepack enable        # uses the pnpm version pinned in package.json
pnpm install
pnpm dev               # then press i (iOS), a (Android), or scan the QR code with Expo Go
```

| Command                                      | What it does                                  |
| -------------------------------------------- | --------------------------------------------- |
| `pnpm dev`                                   | Start the Expo dev server                     |
| `pnpm lint`                                  | ESLint (`expo lint`)                          |
| `pnpm typecheck`                             | TypeScript, strict                            |
| `pnpm format` / `pnpm format:check`          | Prettier over `apps/`                         |
| `pnpm expo install <pkg>` (in `apps/mobile`) | Add a dependency at an SDK-compatible version |

Tests, local Supabase, and type generation arrive in Phase 1.

## Repo layout

```
apps/mobile/          Expo app
  src/app/            routes only (Expo Router)
  src/screens/        screen bodies rendered by routes
  src/components/     shared UI
  src/hooks/, utils/  hooks and helpers
  src/data/           domain types + placeholder data
  src/theme/          design tokens
docs/                 product, architecture, ADRs, roadmap
.claude/              Claude Code settings and project skills
```

Details in [Architecture → Mobile app](docs/architecture/overview.md#mobile-app-appsmobile).

## Docs

- [Product vision](docs/product/vision.md) · [Glossary](docs/product/glossary.md)
- [Architecture](docs/architecture/overview.md) · [Decisions (ADRs)](docs/adr/)
- [Roadmap](docs/roadmap.md)

## Contributing

- Specs before code for features, and an ADR for anything hard to reverse — see [`CLAUDE.md`](CLAUDE.md) for the working agreements.
- Use the [glossary](docs/product/glossary.md) terms in code: `kilo`, `host`, `participant`, `meeting point`. Distances are shown in `km`.
- Run `pnpm lint && pnpm typecheck && pnpm format:check` before opening a merge request.

## License

MIT
