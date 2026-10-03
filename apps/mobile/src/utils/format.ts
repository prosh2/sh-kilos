// Display formatting. Data is stored in metres, seconds and UTC; convert only here.
import type { Kilo, Sport } from '@/data/types';

const LOCALE = 'en-GB';

export const sportLabels: Record<Sport, string> = {
  run: 'Run',
  ride: 'Ride',
  swim: 'Swim',
  triathlon: 'Triathlon',
  duathlon: 'Duathlon',
  other: 'Other',
};

// Lowercase noun for copy like "Your Saturday run is on."
export function sportNoun(sport: Sport): string {
  return sport === 'other' ? 'Kilo' : sportLabels[sport].toLowerCase();
}

// Verb for copy like "We ride together."
export function sportVerb(sport: Sport): string {
  return sport === 'run' || sport === 'ride' || sport === 'swim' ? sport : 'train';
}

// Distances are always km in the UI (never "kilos" — that word means the invitation).
export function formatDistance(metres: number): string {
  const km = metres / 1000;
  const rounded = km >= 10 ? Math.round(km) : Math.round(km * 10) / 10;
  return `${rounded.toLocaleString(LOCALE)} km`;
}

function formatMinSec(totalSeconds: number): string {
  const rounded = Math.round(totalSeconds);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export interface FormattedPace {
  value: string;
  unit: string;
}

// Pace unit depends on the sport (glossary): min/km runs, km/h rides, min/100m swims.
export function formatPace(
  kilo: Pick<Kilo, 'sport' | 'paceMinSecPerKm' | 'paceMaxSecPerKm'>,
): FormattedPace | null {
  const { sport, paceMinSecPerKm: fast, paceMaxSecPerKm: slow } = kilo;
  if (fast === null || slow === null) return null;

  if (sport === 'ride') {
    return { value: `${Math.round(3600 / slow)}–${Math.round(3600 / fast)}`, unit: 'km/h' };
  }
  if (sport === 'swim') {
    return { value: `${formatMinSec(fast / 10)}–${formatMinSec(slow / 10)}`, unit: 'min/100m' };
  }
  return { value: `${formatMinSec(fast)}–${formatMinSec(slow)}`, unit: 'min/km' };
}

export function formatPaceInline(kilo: Kilo): string {
  const pace = formatPace(kilo);
  return pace ? `${pace.value} ${pace.unit}` : 'All paces welcome';
}

// Times are shown in the athlete's own time zone (the device's).
// Built from parts so the output is "Sat 10 Oct" on every JS engine (Hermes adds a comma).
function formatDay(iso: string, style: 'short' | 'long'): string {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    weekday: style,
    day: 'numeric',
    month: style,
  }).formatToParts(new Date(iso));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return `${part('weekday')} ${part('day')} ${part('month')}`;
}

export function formatShortDay(iso: string): string {
  return formatDay(iso, 'short');
}

export function formatLongDay(iso: string): string {
  return formatDay(iso, 'long');
}

export function formatWeekday(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, { weekday: 'long' });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
}

export function formatShortDateTime(iso: string): string {
  return `${formatShortDay(iso)} · ${formatTime(iso)}`;
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

// "Europe/London" -> "London time"
export function timeZoneLabel(): string {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const city = zone.split('/').pop() ?? zone;
  return `${city.replace(/_/g, ' ')} time`;
}

export function formatGoing(kilo: Kilo, goingCount = kilo.participantIds.length): string {
  if (kilo.capacity === null) return `${goingCount} going`;
  const open = Math.max(kilo.capacity - goingCount, 0);
  return `${goingCount} going · ${open} ${open === 1 ? 'spot' : 'spots'} open`;
}

export function initialOf(displayName: string): string {
  return displayName.trim().charAt(0).toUpperCase();
}

export function firstNameOf(displayName: string): string {
  return displayName.trim().split(/\s+/)[0] ?? displayName;
}
