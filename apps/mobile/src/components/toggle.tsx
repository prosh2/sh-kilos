import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel: string;
}

// The design's 42×25 switch; the platform Switch has a fixed, larger size.
export function Toggle({ value, onValueChange, accessibilityLabel }: ToggleProps) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={[styles.track, value ? styles.trackOn : styles.trackOff]}
    >
      <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 42,
    height: 25,
    borderRadius: radius.pill,
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: colors.accent,
  },
  trackOff: {
    backgroundColor: colors.border,
  },
  thumb: {
    width: 19,
    height: 19,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  thumbOn: {
    marginLeft: 20,
  },
  thumbOff: {
    marginLeft: 3,
  },
});
