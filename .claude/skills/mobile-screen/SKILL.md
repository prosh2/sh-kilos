---
name: mobile-screen
description: Checklist for adding or changing a screen, route, or UI component in the Kilos Expo app (apps/mobile). Use when building or editing any mobile UI — e.g. "add the profile screen", "build the join flow UI", "add a filter sheet to Explore".
---

# Mobile screen

The architecture lives in `docs/architecture/overview.md` (Mobile app section) and ADRs 0001 and 0006. Read those and don't duplicate them here. This skill is the order of work.

## Before writing code

1. If this is a new feature, make sure there's an approved spec (`feature-spec` skill).
2. If it touches location or meeting points, Kilo visibility, joining, chat, profiles, or notifications, run the `safety-privacy-review` skill.
3. Load the Expo skill that matches the work:
   - routes, tabs, stacks, modals, sheets → `expo:expo-router`
   - native controls (sheets, pickers, toggles, menus, grouped forms) → `expo:expo-ui` first, then fall back to our `components/`
   - tokens, or a component that's drifting from the design → `expo:expo-design-system` (our tokens stay in `src/theme`, per ADR 0006)
   - motion and gestures → `expo:expo-animation`
   - fetching Supabase data → `expo:expo-data-fetching`
   - a new dependency → install it with `pnpm expo install` from `apps/mobile`, and get sign-off first (CLAUDE.md)
4. If there's a Figma frame, use `figma:figma-design-to-code`.

## Where code goes

- **Route** `src/app/...`: reads URL params, handles not-found, renders the screen. Keep it under about 15 lines. See `src/app/kilos/[id]/index.tsx`.
- **Screen** `src/screens/<name>.tsx`: exports a named component (`KiloDetails`) and takes resolved data as props. Once it has private components, turn it into `src/screens/<name>/index.tsx` with those components alongside it.
- **Component** `src/components/<kebab-name>.tsx`: only when two or more screens use it, or it's a generic primitive. One named export.
- **Hook** `src/hooks/use-*.ts` · **Helper** `src/utils/*.ts`, with a `*.test.ts` file next to it.

## Rules

- `StyleSheet.create` goes at the bottom of the file. Colours, fonts, radii, `screenGutter` and `iconStroke` come from `@/theme`. Never hardcode a hex colour or a font family.
- Lucide icons always get `{...iconStroke}`.
- Use glossary names (`kilo`, `host`, `participant`, `meetingPoint`). Distances show as `km` through `utils/format.ts`. Never use "kilos" to mean distance.
- Keep metres, seconds and UTC ISO strings in data. Convert for display only, in `utils/format.ts`.
- Handle empty, loading and error states. Give tappable elements an `accessibilityLabel` or `accessibilityRole`.
- TypeScript strict. No `any` without a comment explaining why.

## Finish

Run the `verify` skill. If the screen is reachable, open it in the simulator. Then list the changed files so a human can commit them.
