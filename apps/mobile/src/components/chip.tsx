import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, iconStroke, radius } from '@/theme';

interface ChipProps {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
}

// Pill used for browse filters and the sport picker.
export function Chip({ label, icon: Icon, selected = false, onPress }: ChipProps) {
  const foreground = selected ? colors.surface : colors.ink;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.selected]}
    >
      {Icon && <Icon size={14} color={foreground} {...iconStroke} />}
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});
