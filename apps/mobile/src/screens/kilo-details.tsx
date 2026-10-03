import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ArrowLeft, ArrowRight, CalendarDays, HeartHandshake, MapPin } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, AvatarStack } from '@/components/avatar';
import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { InfoRow } from '@/components/info-row';
import { placeholderKiloPhoto } from '@/components/kilo-card';
import { ScreenHeader } from '@/components/screen-header';
import { Tag } from '@/components/tag';
import { getAthlete } from '@/data/placeholder';
import type { Kilo } from '@/data/types';
import {
  formatDistance,
  formatGoing,
  formatLongDay,
  formatPace,
  formatTime,
  sportLabels,
} from '@/utils/format';
import { colors, fonts, iconStroke, radius, screenGutter } from '@/theme';

export function KiloDetails({ kilo }: { kilo: Kilo }) {
  const host = getAthlete(kilo.hostId);
  const pace = formatPace(kilo);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="The Kilo"
        left={{ icon: ArrowLeft, accessibilityLabel: 'Back', onPress: () => router.back() }}
      />

      <ScrollView>
        <View style={styles.photo}>
          <Image source={placeholderKiloPhoto} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={styles.photoLabel}>
            <Tag label="Good kms. Better company." tone="surface" />
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.introduction}>
            <View style={styles.tags}>
              <Tag label={sportLabels[kilo.sport]} tone="accent" />
              {kilo.noDrop && <Tag label="No-drop" tone="forest" />}
            </View>
            <Text style={styles.title} accessibilityRole="header">
              {kilo.title}
            </Text>
            <View style={styles.host}>
              <Avatar athlete={host} size="sm" />
              <Text style={styles.hostCredit}>Hosted by {host.displayName}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={[styles.stat, styles.distanceStat]}>
              <Text style={styles.statLabel}>DISTANCE</Text>
              <Text style={styles.statValue}>{formatDistance(kilo.distanceM)}</Text>
            </View>
            <View style={[styles.stat, styles.paceStat]}>
              <Text style={styles.statLabel}>
                {pace ? `EXPECTED PACE · ${pace.unit.toUpperCase()}` : 'EXPECTED PACE'}
              </Text>
              <Text style={styles.statValue}>{pace ? pace.value : 'All paces'}</Text>
            </View>
          </View>

          <View style={styles.essentials}>
            <InfoRow
              icon={CalendarDays}
              label="When"
              value={`${formatLongDay(kilo.startsAt)} · ${formatTime(kilo.startsAt)}`}
            />
            <InfoRow
              icon={MapPin}
              label={`Meeting point · ${formatDistance(kilo.distanceFromYouM)} from you`}
              value={kilo.meetingPoint.label}
            />
          </View>

          <Divider />

          <View style={styles.expect}>
            <Text style={styles.sectionHeading}>What to expect</Text>
            <Text style={styles.notes}>{kilo.description}</Text>
            {kilo.noDrop && (
              <View style={styles.reassurance}>
                <HeartHandshake size={17} color={colors.forest} {...iconStroke} />
                <Text style={styles.reassuranceText}>No-drop. No one gets left behind.</Text>
              </View>
            )}
          </View>

          <View style={styles.group}>
            <Text style={styles.groupHeading}>Your kind of company</Text>
            <View style={styles.groupRow}>
              <AvatarStack athletes={kilo.participantIds.map(getAthlete)} />
              <Text style={styles.going}>{formatGoing(kilo)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomBar caption="Free to join. Meet your group in the chat.">
        <Button
          label="Join this Kilo"
          icon={ArrowRight}
          onPress={() => router.push({ pathname: '/kilos/[id]/joined', params: { id: kilo.id } })}
        />
      </BottomBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  photo: {
    height: 188,
  },
  photoLabel: {
    position: 'absolute',
    left: screenGutter,
    bottom: 16,
  },
  details: {
    gap: 20,
    padding: screenGutter,
  },
  introduction: {
    gap: 12,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 32.4,
    color: colors.ink,
  },
  host: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hostCredit: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    gap: 5,
    padding: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.subtle,
  },
  distanceStat: {
    width: 100,
  },
  paceStat: {
    flex: 1,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
  },
  statValue: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    color: colors.ink,
  },
  essentials: {
    gap: 14,
  },
  expect: {
    gap: 9,
  },
  sectionHeading: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.ink,
  },
  notes: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.muted,
  },
  reassurance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reassuranceText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.forest,
  },
  group: {
    gap: 10,
  },
  groupHeading: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.ink,
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
});
