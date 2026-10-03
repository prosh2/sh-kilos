import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, iconStroke, radius } from '@/theme';

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

// Icon tile with a small label above a bold value ("When", "Meeting point").
export function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.symbol}>
        <Icon size={18} color={colors.forest} {...iconStroke} />
      </View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  symbol: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: 3,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.ink,
  },
});
