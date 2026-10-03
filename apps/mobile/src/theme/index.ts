// Design tokens from the Kilos App Design Figma file.

export const colors = {
  canvas: '#F6F3EC',
  surface: '#FFFEFA',
  subtle: '#EDEDE3',
  border: '#DDDCD2',
  ink: '#242923',
  muted: '#73766C',
  accent: '#D94C2C',
  accentSoft: '#FBE8DF',
  forest: '#4E6045',
  forestSoft: '#E0E7D9',
  mapLand: '#ECEBDD',
  mapRoad: '#FFFDF4',
  white: '#FFFFFF',
} as const;

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 100,
} as const;

// Horizontal padding used by every screen in the design.
export const screenGutter = 24;

// Lucide icons in the design use a fixed 1.8px stroke regardless of size.
export const iconStroke = { strokeWidth: 1.8, absoluteStrokeWidth: true } as const;
