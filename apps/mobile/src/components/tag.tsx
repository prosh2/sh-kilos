import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '@/theme';

type TagTone = 'accent' | 'forest' | 'surface';

const tones: Record<TagTone, { background: string; text: string }> = {
  accent: { background: colors.accentSoft, text: colors.accent },
  forest: { background: colors.forestSoft, text: colors.forest },
  surface: { background: colors.surface, text: colors.ink },
};

interface TagProps {
  label: string;
  tone?: TagTone;
}

export function Tag({ label, tone = 'forest' }: TagProps) {
  const { background, text } = tones[tone];
  return (
    <View style={[styles.tag, { backgroundColor: background }]}>
      <Text style={[styles.label, { color: text }]}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 10,
  },
});
