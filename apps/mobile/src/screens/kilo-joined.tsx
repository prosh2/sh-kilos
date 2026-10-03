import { router } from 'expo-router';
import {
  ArrowUpRight,
  Backpack,
  CalendarDays,
  CalendarPlus,
  Check,
  Ellipsis,
  MessageCircle,
  X,
} from 'lucide-react-native';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvatarStack } from '@/components/avatar';
import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { InfoRow } from '@/components/info-row';
import { MeetingPointMapPlaceholder } from '@/components/meeting-point-map';
import { ScreenHeader } from '@/components/screen-header';
import { Tag } from '@/components/tag';
import { currentAthleteId, getAthlete, participantsAfterJoining } from '@/data/placeholder';
import type { Kilo, MeetingPoint } from '@/data/types';
import {
  firstNameOf,
  formatDistance,
  formatLongDay,
  formatPaceInline,
  formatTime,
  formatWeekday,
  sportLabels,
  sportNoun,
  timeZoneLabel,
} from '@/utils/format';
import { colors, fonts, iconStroke, radius, screenGutter } from '@/theme';

function openInMaps({ latitude, longitude, label }: MeetingPoint) {
  const query = encodeURIComponent(label);
  const url =
    Platform.OS === 'ios'
      ? `https://maps.apple.com/?ll=${latitude},${longitude}&q=${query}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}(${query})`;
  void Linking.openURL(url);
}

export function KiloJoined({ kilo }: { kilo: Kilo }) {
  const me = getAthlete(currentAthleteId);
  const participants = participantsAfterJoining(kilo);
  const sportTag = [sportLabels[kilo.sport], kilo.noDrop ? 'No-drop' : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="You’re on the list"
        left={{ icon: X, accessibilityLabel: 'Close', onPress: () => router.back() }}
        // Will hold "Leave this Kilo" once joining is real.
        right={{ icon: Ellipsis, accessibilityLabel: 'More options' }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.confirmation}>
          <View style={styles.emblem}>
            <Check size={26} color={colors.accent} {...iconStroke} />
          </View>
          <Text style={styles.headline} accessibilityRole="header">
            You’re in, {firstNameOf(me.displayName)}.
          </Text>
          <Text style={styles.confirmationCopy}>
            One more friendly face. Your {formatWeekday(kilo.startsAt)} {sportNoun(kilo.sport)} is
            on.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardStatus}>
            <Tag label={sportTag} tone="forest" />
            <Text style={styles.joined}>JOINED</Text>
          </View>
          <Text style={styles.cardTitle}>{kilo.title}</Text>
          <Text style={styles.cardStats}>
            {formatDistance(kilo.distanceM)} · {formatPaceInline(kilo)}
          </Text>
          <Divider />
          <View style={styles.groupRow}>
            <AvatarStack athletes={participants} />
            <Text style={styles.going}>{participants.length} going · including you</Text>
          </View>
        </View>

        <View style={styles.plan}>
          <View style={styles.planHeading}>
            <Text style={styles.sectionHeading}>The plan</Text>
            <Text style={styles.timeZone}>{timeZoneLabel()}</Text>
          </View>

          <InfoRow
            icon={CalendarDays}
            label={formatLongDay(kilo.startsAt)}
            value={`Starts ${formatTime(kilo.startsAt)}`}
          />

          <MeetingPointMapPlaceholder />

          <View style={styles.instructions}>
            <Pressable
              style={styles.meetingPoint}
              onPress={() => openInMaps(kilo.meetingPoint)}
              accessibilityRole="link"
              accessibilityLabel={`Open ${kilo.meetingPoint.label} in maps`}
            >
              <Text style={styles.place}>{kilo.meetingPoint.label}</Text>
              <ArrowUpRight size={18} color={colors.accent} {...iconStroke} />
            </Pressable>
            {kilo.meetingPointNotes && (
              <Text style={styles.directions}>{kilo.meetingPointNotes}</Text>
            )}
          </View>

          {kilo.preparationNote && (
            <View style={styles.preparation}>
              <Backpack size={18} color={colors.forest} {...iconStroke} />
              <Text style={styles.preparationText}>{kilo.preparationNote}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomBar caption="Plans change? Leave the Kilo so the group knows." bordered={false}>
        <Button
          label="Say hi to the group"
          icon={MessageCircle}
          onPress={() => router.replace({ pathname: '/kilos/[id]/chat', params: { id: kilo.id } })}
        />
        {/* Calendar export is out of scope for the scaffold. */}
        <Button label="Add to calendar" icon={CalendarPlus} variant="secondary" />
      </BottomBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    gap: 24,
    paddingHorizontal: screenGutter,
    paddingTop: 16,
    paddingBottom: 22,
  },
  confirmation: {
    gap: 12,
  },
  emblem: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 35,
    color: colors.ink,
  },
  confirmationCopy: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.muted,
  },
  card: {
    gap: 12,
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  joined: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.accent,
  },
  cardTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.ink,
  },
  cardStats: {
    fontFamily: fonts.regular,
    fontSize: 12,
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
  plan: {
    gap: 16,
  },
  planHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontFamily: fonts.semibold,
    fontSize: 19,
    color: colors.ink,
  },
  timeZone: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  instructions: {
    gap: 6,
  },
  meetingPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  place: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.ink,
  },
  directions: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
  preparation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.subtle,
  },
  preparationText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.forest,
  },
});
