# 0006. Build the UI on our own design tokens, with Inter and Lucide icons

- **Status:** Accepted
- **Date:** 2026-10-03

## Context

The first frontend scaffold implements the five screens in the Kilos App Design Figma file (Explore Kilos, Kilo details, Create a Kilo, You're in, Kilo chat) with placeholder data. The design uses the Inter typeface, Lucide icons drawn at a fixed 1.8px stroke, a photo per Kilo card, and a small, consistent palette. We needed a font source, an icon approach, an image component, a styling approach, and lint/format tooling, and we wanted as few dependencies as possible.

## Options

### Icons: `lucide-react-native` (+ `react-native-svg`)

- For: the design's icons are Lucide icons by name; `absoluteStrokeWidth` reproduces the fixed 1.8px stroke exactly; colours and sizes are props; new icons need no export step.
- Against: one more runtime dependency.

### Icons: export each SVG from Figma and add an SVG transformer

- For: pixel-identical files from the design.
- Against: needs a Metro transformer plus a build-time config change; every new or recoloured icon means exporting again by hand.

### Styling: our own design tokens + `StyleSheet`

- For: no new dependency; the palette and type scale are small enough to fit in `src/theme`; it's the React Native default, so nothing extra to learn.
- Against: no ready-made components or utility classes, so we build our own (chip, button, field, tag).

### Styling: a UI kit or Tailwind (NativeWind, Tamagui, …)

- For: faster to put together generic screens.
- Against: a heavy dependency and its own build setup to keep working through Expo SDK upgrades; the design is custom, so we'd override most of the kit anyway.

## Decision

- Inter through `@expo-google-fonts/inter`, loaded with `expo-font` in the root layout.
- Lucide icons through `lucide-react-native` + `react-native-svg`, always passing `iconStroke` from `src/theme`.
- `expo-image` for photos.
- Our own design tokens in `apps/mobile/src/theme` and `StyleSheet`; shared components in `apps/mobile/src/components`. No UI kit, no Tailwind.
- ESLint 9 with `eslint-config-expo` (via `expo lint`), and Prettier for `apps/`.
- pnpm 12, pinned in the root `packageManager` and run through corepack. Dependency build scripts are blocked unless listed under `allowBuilds` in `pnpm-workspace.yaml`.

## Consequences

- Screens follow the Figma tokens directly; changing a colour or font is a one-file change.
- We maintain our own small component set and its accessibility (roles, labels, states).
- ESLint stays on v9 because `eslint-plugin-react` (pulled in by `eslint-config-expo`) crashes on ESLint 10. Revisit when `eslint-config-expo` supports ESLint 10.
- Revisit the styling decision if the screen count grows a lot and we're rebuilding the same components over and over, or if we add a web app (ADR 0003) that should share UI.
