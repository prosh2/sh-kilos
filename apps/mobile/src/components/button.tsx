import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, iconStroke, radius } from '@/theme';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  label: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  onPress?: () => void;
}

export function Button({ label, icon: Icon, variant = 'primary', onPress }: ButtonProps) {
  const primary = variant === 'primary';
  const foreground = primary ? colors.white : colors.ink;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        primary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
      {Icon && <Icon size={18} color={foreground} {...iconStroke} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
});
