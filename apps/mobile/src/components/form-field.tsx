import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, iconStroke, radius } from '@/theme';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function FormField({ label, children, style }: FormFieldProps) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  // Unit shown after the value, e.g. "km".
  suffix?: string;
}

export function TextField({ suffix, multiline, ...inputProps }: TextFieldProps) {
  return (
    <View style={[styles.input, multiline && styles.multiline]}>
      <TextInput
        {...inputProps}
        multiline={multiline}
        placeholderTextColor={colors.muted}
        style={[styles.inputText, multiline && styles.multilineText]}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  );
}

interface SelectFieldProps {
  value?: string;
  placeholder: string;
  trailingIcon: LucideIcon;
  accessibilityLabel: string;
  onPress?: () => void;
}

// Looks like an input but opens a picker. Pickers arrive with the Create a Kilo feature.
export function SelectField({
  value,
  placeholder,
  trailingIcon: Icon,
  accessibilityLabel,
  onPress,
}: SelectFieldProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${accessibilityLabel}: ${value ?? 'not set'}`}
      style={styles.input}
    >
      <Text style={[styles.inputText, !value && styles.placeholder]} numberOfLines={1}>
        {value ?? placeholder}
      </Text>
      <Icon size={17} color={colors.muted} {...iconStroke} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.muted,
  },
  input: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
  },
  multiline: {
    minHeight: 82,
    alignItems: 'flex-start',
    paddingVertical: 13,
  },
  inputText: {
    flex: 1,
    paddingVertical: 0,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.ink,
  },
  // iOS offsets single-line TextInput text when lineHeight is set, so only apply it here.
  multilineText: {
    lineHeight: 19.5,
    textAlignVertical: 'top',
  },
  placeholder: {
    color: colors.muted,
  },
  suffix: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
});
