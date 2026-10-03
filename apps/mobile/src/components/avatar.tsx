import { StyleSheet, Text, View } from 'react-native';

import type { Athlete, AvatarTone } from '@/data/types';
import { initialOf } from '@/utils/format';
import { colors, fonts, radius } from '@/theme';

const toneColors: Record<AvatarTone, { background: string; text: string }> = {
  forest: { background: colors.forestSoft, text: colors.forest },
  sand: { background: colors.subtle, text: colors.forest },
  accent: { background: colors.accentSoft, text: colors.accent },
};

type AvatarSize = 'sm' | 'md';

const sizes: Record<AvatarSize, { box: number; font: number }> = {
  sm: { box: 28, font: 9 },
  md: { box: 32, font: 12 },
};

interface AvatarProps {
  athlete: Athlete;
  size?: AvatarSize;
}

export function Avatar({ athlete, size = 'md' }: AvatarProps) {
  const tone = toneColors[athlete.tone];
  const { box, font } = sizes[size];
  return (
    <View
      style={[styles.avatar, { width: box, height: box, backgroundColor: tone.background }]}
      accessibilityLabel={athlete.displayName}
    >
      <Text style={[styles.initial, { fontSize: font, color: tone.text }]}>
        {initialOf(athlete.displayName)}
      </Text>
    </View>
  );
}

interface AvatarStackProps {
  athletes: Athlete[];
}

export function AvatarStack({ athletes }: AvatarStackProps) {
  return (
    <View style={styles.stack}>
      {athletes.map((athlete, index) => (
        <View key={athlete.id} style={index < athletes.length - 1 && styles.overlap}>
          <Avatar athlete={athlete} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: fonts.semibold,
  },
  stack: {
    flexDirection: 'row',
  },
  overlap: {
    marginRight: -6,
  },
});
