// Shapes mirror the draft data model in docs/architecture/overview.md.
// They will be replaced by generated Supabase types when the backend lands.

export type Sport = 'run' | 'ride' | 'swim' | 'triathlon' | 'duathlon' | 'other';

export type KiloStatus = 'open' | 'full' | 'cancelled' | 'completed';

export type AvatarTone = 'forest' | 'sand' | 'accent';

export interface Athlete {
  id: string;
  displayName: string;
  // Placeholder for avatar colour until profiles have avatars.
  tone: AvatarTone;
}

export interface MeetingPoint {
  latitude: number;
  longitude: number;
  label: string;
}

export interface Kilo {
  id: string;
  hostId: string;
  sport: Sport;
  title: string;
  description: string;
  startsAt: string; // ISO 8601, UTC
  meetingPoint: MeetingPoint;
  distanceM: number;
  // Pace stored as seconds per km for every sport; converted per sport at display.
  // null means "all paces welcome".
  paceMinSecPerKm: number | null;
  paceMaxSecPerKm: number | null;
  noDrop: boolean;
  capacity: number | null;
  status: KiloStatus;
  participantIds: string[]; // includes the host
  // Computed server-side for the signed-in athlete; never another athlete's position.
  distanceFromYouM: number;
  // Not in the data model yet: shown in the design, to be settled in the Phase 2 spec.
  meetingPointNotes?: string;
  preparationNote?: string;
}

export interface KiloMessage {
  id: string;
  kiloId: string;
  authorId: string;
  body: string;
  createdAt: string; // ISO 8601, UTC
}
