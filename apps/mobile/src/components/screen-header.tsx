import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, iconStroke, screenGutter } from '@/theme';

interface HeaderAction {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress?: () => void;
}

interface ScreenHeaderProps {
  title: string;
  left: HeaderAction;
  right?: HeaderAction;
}

function ActionButton({ action, align }: { action: HeaderAction; align: 'start' | 'end' }) {
  const Icon = action.icon;
  return (
    <Pressable
      onPress={action.onPress}
      accessibilityRole="button"
      accessibilityLabel={action.accessibilityLabel}
      hitSlop={8}
      style={align === 'start' ? styles.leading : styles.trailing}
    >
      <Icon size={20} color={colors.ink} {...iconStroke} />
    </Pressable>
  );
}

// Navigation bar from the design: leading action, title, optional trailing action.
export function ScreenHeader({ title, left, right }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <ActionButton action={left} align="start" />
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {right ? <ActionButton action={right} align="end" /> : <View style={styles.trailing} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenGutter,
  },
  leading: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  trailing: {
    width: 52,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.ink,
  },
});
