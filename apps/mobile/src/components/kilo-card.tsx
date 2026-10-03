import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AvatarStack } from '@/components/avatar';
import { sportIcons } from '@/components/sport-icon';
import { Tag } from '@/components/tag';
import { getAthlete } from '@/data/placeholder';
import type { Kilo } from '@/data/types';
import {
  formatDistance,
  formatGoing,
  formatPaceInline,
  formatShortDateTime,
  sportLabels,
} from '@/utils/format';
import { colors, fonts, iconStroke, radius } from '@/theme';

// Kilos have no photos in the data model yet, so every photo card shows this placeholder.
export const placeholderKiloPhoto = require('../../assets/images/kilo-placeholder.jpg');

interface KiloCardProps {
  kilo: Kilo;
  variant?: 'photo' | 'compact';
  onPress?: () => void;
}

export function KiloCard({ kilo, variant = 'compact', onPress }: KiloCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${kilo.title}, ${sportLabels[kilo.sport]}, ${formatShortDateTime(kilo.startsAt)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {variant === 'photo' ? <PhotoContent kilo={kilo} /> : <CompactContent kilo={kilo} />}
    </Pressable>
  );
}

function PhotoContent({ kilo }: { kilo: Kilo }) {
  return (
    <>
      <View style={styles.photo}>
        <Image source={placeholderKiloPhoto} style={StyleSheet.absoluteFill} contentFit="cover" />
        {kilo.noDrop && (
          <View style={styles.photoBadge}>
            <Tag label="No one left behind" tone="surface" />
          </View>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.contextRow}>
          <Text style={styles.sportBold}>{sportLabels[kilo.sport].toUpperCase()}</Text>
          <Text style={styles.time}>{formatShortDateTime(kilo.startsAt)}</Text>
        </View>
        <Text style={styles.titleLarge}>{kilo.title}</Text>
        <Text style={styles.statsInline}>
          {formatDistance(kilo.distanceM)}
          {'  /  '}
          {formatPaceInline(kilo)}
        </Text>
        <View style={styles.meetingRow}>
          <MapPin size={12} color={colors.muted} {...iconStroke} />
          <Text style={styles.meta}>
            {kilo.meetingPoint.label} · {formatDistance(kilo.distanceFromYouM)} away
          </Text>
        </View>
        <View style={styles.groupRow}>
          <AvatarStack athletes={kilo.participantIds.map(getAthlete)} />
          <Text style={styles.going}>{formatGoing(kilo)}</Text>
        </View>
      </View>
    </>
  );
}

function CompactContent({ kilo }: { kilo: Kilo }) {
  const SportIcon = sportIcons[kilo.sport];
  return (
    <View style={styles.body}>
      <View style={styles.contextRow}>
        <View style={styles.sport}>
          {SportIcon && <SportIcon size={15} color={colors.accent} {...iconStroke} />}
          <Text style={styles.sportLabel}>{sportLabels[kilo.sport].toUpperCase()}</Text>
        </View>
        <Text style={styles.time}>{formatShortDateTime(kilo.startsAt)}</Text>
      </View>
      <Text style={styles.title}>{kilo.title}</Text>
      <View style={styles.stats}>
        <Text style={styles.distance}>{formatDistance(kilo.distanceM)}</Text>
        <Text style={styles.separator}>/</Text>
        <Text style={styles.pace}>{formatPaceInline(kilo)}</Text>
      </View>
      <View style={styles.contextRow}>
        <Text style={styles.meta}>
          {kilo.meetingPoint.label} · {formatDistance(kilo.distanceFromYouM)} away
        </Text>
        <Text style={styles.goingShort}>{kilo.participantIds.length} going</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  photo: {
    height: 126,
  },
  photoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  body: {
    padding: 16,
    gap: 10,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sport: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sportBold: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.accent,
  },
  sportLabel: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.accent,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  titleLarge: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.ink,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19,
    color: colors.ink,
  },
  statsInline: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
  },
  distance: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.ink,
  },
  separator: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
  },
  pace: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.ink,
  },
  meetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  meta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  going: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
  },
  goingShort: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.forest,
  },
});
