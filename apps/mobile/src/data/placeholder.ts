// Placeholder data for the frontend scaffold. Replaced by Supabase queries later.
import type { Athlete, Kilo, KiloMessage } from './types';

export const currentAthleteId = 'alex';

export const athletes: Record<string, Athlete> = {
  maya: { id: 'maya', displayName: 'Maya Chen', tone: 'forest' },
  theo: { id: 'theo', displayName: 'Theo', tone: 'sand' },
  priya: { id: 'priya', displayName: 'Priya', tone: 'accent' },
  jules: { id: 'jules', displayName: 'Jules', tone: 'sand' },
  sam: { id: 'sam', displayName: 'Sam', tone: 'forest' },
  alex: { id: 'alex', displayName: 'Alex', tone: 'accent' },
  noor: { id: 'noor', displayName: 'Noor', tone: 'forest' },
  ben: { id: 'ben', displayName: 'Ben', tone: 'sand' },
  kai: { id: 'kai', displayName: 'Kai', tone: 'accent' },
  lena: { id: 'lena', displayName: 'Lena', tone: 'forest' },
};

export const kilos: Kilo[] = [
  {
    id: 'easy-miles',
    hostId: 'maya',
    sport: 'run',
    title: 'Easy miles, good company',
    description:
      'An easy 6 km around the park. We’ll stay together, regroup when needed, and finish with coffee. New to group runs? You’re very welcome.',
    startsAt: '2026-10-10T06:30:00Z',
    meetingPoint: { latitude: 51.5362, longitude: -0.0378, label: 'Victoria Park, East Gate' },
    distanceM: 6000,
    paceMinSecPerKm: 360,
    paceMaxSecPerKm: 390,
    noDrop: true,
    capacity: 8,
    status: 'open',
    participantIds: ['maya', 'theo', 'priya', 'jules', 'sam'],
    distanceFromYouM: 1200,
    meetingPointNotes: 'Green gates on Cadogan Terrace. Look for Maya in the orange top.',
    preparationNote: 'Bring water and a layer for the coffee stop.',
  },
  {
    id: 'canal-spin',
    hostId: 'noor',
    sport: 'ride',
    title: 'Canal-side coffee spin',
    description:
      'Easy canal loop with a coffee stop. Bring a helmet, water and a spare tube. We’ll regroup at every turn.',
    startsAt: '2026-10-11T07:00:00Z',
    meetingPoint: { latitude: 51.5434, longitude: -0.0251, label: 'Hackney Wick' },
    distanceM: 35000,
    paceMinSecPerKm: 144, // 25 km/h
    paceMaxSecPerKm: 164, // 22 km/h
    noDrop: false,
    capacity: null,
    status: 'open',
    participantIds: ['noor', 'ben', 'kai', 'lena'],
    distanceFromYouM: 2400,
  },
  {
    id: 'first-laps',
    hostId: 'lena',
    sport: 'swim',
    title: 'First laps, friendly faces',
    description: 'Relaxed lengths in the lido, then a warm drink. Every pace is welcome.',
    startsAt: '2026-10-11T08:00:00Z',
    meetingPoint: { latitude: 51.5414, longitude: -0.0606, label: 'London Fields Lido' },
    distanceM: 1000,
    paceMinSecPerKm: null,
    paceMaxSecPerKm: null,
    noDrop: true,
    capacity: null,
    status: 'open',
    participantIds: ['lena', 'kai', 'ben'],
    distanceFromYouM: 1800,
  },
];

export const kiloMessages: KiloMessage[] = [
  {
    id: 'm1',
    kiloId: 'easy-miles',
    authorId: 'maya',
    body: 'Morning team! Meet at 07:20 by the green gates. I’ll be in an orange top. Coffee after? ☕',
    createdAt: '2026-10-09T08:12:00Z',
  },
  {
    id: 'm2',
    kiloId: 'easy-miles',
    authorId: 'priya',
    body: 'Yes to coffee! My first group run — is it okay if I’m nearer 6:30/km?',
    createdAt: '2026-10-09T08:14:00Z',
  },
  {
    id: 'm3',
    kiloId: 'easy-miles',
    authorId: 'maya',
    body: 'Absolutely. We’ll stay at a chatty pace and regroup. You won’t be left behind 😊',
    createdAt: '2026-10-09T08:15:00Z',
  },
  {
    id: 'm4',
    kiloId: 'easy-miles',
    authorId: 'theo',
    body: 'I’m in the 6:30 crew too. See you all at the gate!',
    createdAt: '2026-10-09T08:16:00Z',
  },
  {
    id: 'm5',
    kiloId: 'easy-miles',
    authorId: 'alex',
    body: 'Hi everyone, Alex here! Looking forward to it. I’ll be there at 07:20 🙌',
    createdAt: '2026-10-09T08:18:00Z',
  },
];

export function getKilo(id: string): Kilo | undefined {
  return kilos.find((kilo) => kilo.id === id);
}

export function getAthlete(id: string): Athlete {
  const athlete = athletes[id];
  if (!athlete) throw new Error(`Unknown athlete: ${id}`);
  return athlete;
}

// The scaffold has no join state yet: screens after "Join" assume the current athlete joined.
export function participantsAfterJoining(kilo: Kilo): Athlete[] {
  const ids = kilo.participantIds.includes(currentAthleteId)
    ? kilo.participantIds
    : [...kilo.participantIds, currentAthleteId];
  return ids.map(getAthlete);
}
