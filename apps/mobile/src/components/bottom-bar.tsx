import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, screenGutter } from '@/theme';

interface BottomBarProps {
  children: ReactNode;
  caption?: string;
  bordered?: boolean;
}

// Sticky action area at the bottom of a screen, with a short caption under the buttons.
export function BottomBar({ children, caption, bordered = true }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bar,
        bordered ? styles.bordered : styles.plain,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {children}
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    gap: 9,
    paddingHorizontal: screenGutter,
  },
  bordered: {
    paddingTop: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  plain: {
    paddingTop: 4,
    backgroundColor: colors.canvas,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
});
