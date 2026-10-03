import { Bike, Footprints, WavesHorizontal, type LucideIcon } from 'lucide-react-native';

import type { Sport } from '@/data/types';

// The design only has icons for the single-discipline sports.
export const sportIcons: Partial<Record<Sport, LucideIcon>> = {
  run: Footprints,
  ride: Bike,
  swim: WavesHorizontal,
};
