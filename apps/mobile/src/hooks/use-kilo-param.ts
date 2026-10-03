import { useLocalSearchParams } from 'expo-router';

import { getKilo } from '@/data/placeholder';
import type { Kilo } from '@/data/types';

// Resolves the `[id]` route segment to a Kilo from the placeholder data.
export function useKiloParam(): Kilo | undefined {
  const { id } = useLocalSearchParams<{ id: string }>();
  return typeof id === 'string' ? getKilo(id) : undefined;
}
