import { router } from 'expo-router';
import { ArrowLeft, ArrowUp, ChevronRight, Ellipsis, MapPin, Users } from 'lucide-react-native';
import { Fragment, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Divider } from '@/components/divider';
import { ScreenHeader } from '@/components/screen-header';
import { sportIcons } from '@/components/sport-icon';
import {
  currentAthleteId,
  getAthlete,
  kiloMessages,
  participantsAfterJoining,
} from '@/data/placeholder';
import type { Kilo, KiloMessage } from '@/data/types';
import {
  firstNameOf,
  formatLongDay,
  formatPaceInline,
  formatShortDateTime,
  formatTime,
  isSameLocalDay,
} from '@/utils/format';
import { colors, fonts, iconStroke, radius, screenGutter } from '@/theme';

// Plain text only for MVP (ADR 0004). Keeps messages a sensible size.
const MAX_MESSAGE_LENGTH = 1000;

function daySeparatorLabel(iso: string): string {
  const day = formatLongDay(iso).toUpperCase();
  return isSameLocalDay(new Date(iso), new Date()) ? `TODAY · ${day}` : day;
}

export function KiloChat({ kilo }: { kilo: Kilo }) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<KiloMessage[]>(() =>
    kiloMessages.filter((message) => message.kiloId === kilo.id),
  );
  const [draft, setDraft] = useState('');

  const participants = participantsAfterJoining(kilo);
  const others = participants.filter((athlete) => athlete.id !== currentAthleteId);
  const roster = `${others.map((athlete) => firstNameOf(athlete.displayName)).join(', ')} + you · ${participants.length} going`;
  const SportIcon = sportIcons[kilo.sport];
  const canSend = draft.trim().length > 0;

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    // Local only: sending to kilo_messages arrives with the chat feature (Phase 4).
    setMessages((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        kiloId: kilo.id,
        authorId: currentAthleteId,
        body,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft('');
  };

  const openDetails = () => router.dismissTo({ pathname: '/kilos/[id]', params: { id: kilo.id } });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="Kilo chat"
        left={{ icon: ArrowLeft, accessibilityLabel: 'Back', onPress: () => router.back() }}
        // Will hold report and block options (Phase 5).
        right={{ icon: Ellipsis, accessibilityLabel: 'More options' }}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.identity}>
          <Text style={styles.title} accessibilityRole="header">
            {kilo.title}
          </Text>
          <View style={styles.summaryRow}>
            {SportIcon && <SportIcon size={14} color={colors.accent} {...iconStroke} />}
            <Text style={styles.summary}>
              {formatShortDateTime(kilo.startsAt)} · {formatPaceInline(kilo)}
            </Text>
          </View>
          <Pressable
            style={styles.rosterRow}
            onPress={openDetails}
            accessibilityRole="button"
            accessibilityLabel={`Participants: ${roster}`}
          >
            <Users size={14} color={colors.forest} {...iconStroke} />
            <Text style={styles.roster} numberOfLines={1}>
              {roster}
            </Text>
            <ChevronRight size={14} color={colors.forest} {...iconStroke} />
          </Pressable>
        </View>

        <View style={styles.planWrapper}>
          <View style={styles.plan}>
            <MapPin size={17} color={colors.forest} {...iconStroke} />
            <View style={styles.planText}>
              <Text style={styles.planLabel}>THE PLAN</Text>
              <Text style={styles.planValue}>
                {kilo.meetingPoint.label} · {formatTime(kilo.startsAt)}
              </Text>
              <Pressable onPress={openDetails} accessibilityRole="link" hitSlop={6}>
                <Text style={styles.planLink}>View the plan →</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Divider />

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.conversation}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message, index) => {
            const previous = messages[index - 1];
            const startsNewDay =
              !previous ||
              !isSameLocalDay(new Date(previous.createdAt), new Date(message.createdAt));
            return (
              <Fragment key={message.id}>
                {startsNewDay && (
                  <Text style={styles.daySeparator}>{daySeparatorLabel(message.createdAt)}</Text>
                )}
                {index === 0 && (
                  <Text style={styles.notice}>You joined the Kilo. Say hello 👋</Text>
                )}
                <MessageRow message={message} hostId={kilo.hostId} />
              </Fragment>
            );
          })}
        </ScrollView>

        <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Message the Kilo…"
            placeholderTextColor={colors.muted}
            maxLength={MAX_MESSAGE_LENGTH}
            multiline
            accessibilityLabel="Message"
          />
          <Pressable
            onPress={send}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: !canSend }}
            style={[styles.send, !canSend && styles.sendDisabled]}
          >
            <ArrowUp size={19} color={colors.white} {...iconStroke} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageRow({ message, hostId }: { message: KiloMessage; hostId: string }) {
  const author = getAthlete(message.authorId);
  const isMine = message.authorId === currentAthleteId;

  if (isMine) {
    return (
      <View style={[styles.messageContent, styles.mine]}>
        <View style={[styles.metadata, styles.metadataMine]}>
          <Text style={styles.sender}>You</Text>
          <Text style={styles.sentTime}>{formatTime(message.createdAt)}</Text>
        </View>
        <View style={[styles.bubble, styles.bubbleMine]}>
          <Text style={styles.messageText}>{message.body}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.message}>
      <Avatar athlete={author} size="sm" />
      <View style={[styles.messageContent, styles.theirs]}>
        <View style={styles.metadata}>
          <Text style={styles.sender}>{firstNameOf(author.displayName)}</Text>
          {author.id === hostId && <Text style={styles.hostBadge}>HOST</Text>}
          <Text style={styles.sentTime}>{formatTime(message.createdAt)}</Text>
        </View>
        <View style={[styles.bubble, styles.bubbleTheirs]}>
          <Text style={styles.messageText}>{message.body}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  flex: {
    flex: 1,
  },
  identity: {
    gap: 7,
    paddingHorizontal: screenGutter,
    paddingTop: 8,
    paddingBottom: 18,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 23,
    color: colors.ink,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  summary: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  rosterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roster: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.forest,
  },
  planWrapper: {
    paddingHorizontal: screenGutter,
    paddingBottom: 12,
  },
  plan: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 13,
    borderRadius: radius.sm,
    backgroundColor: colors.forestSoft,
  },
  planText: {
    flex: 1,
    gap: 5,
  },
  planLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.forest,
  },
  planValue: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.ink,
  },
  planLink: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.forest,
  },
  conversation: {
    gap: 16,
    paddingHorizontal: screenGutter,
    paddingTop: 18,
    paddingBottom: 22,
  },
  daySeparator: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.muted,
    textAlign: 'center',
  },
  notice: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
  message: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  messageContent: {
    gap: 6,
  },
  theirs: {
    flex: 1,
    alignItems: 'flex-start',
  },
  mine: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    maxWidth: '81%',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataMine: {
    justifyContent: 'flex-end',
  },
  sender: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.ink,
  },
  hostBadge: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    color: colors.accent,
  },
  sentTime: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
  },
  bubble: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderWidth: 1,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  bubbleTheirs: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: radius.md,
  },
  bubbleMine: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentSoft,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: 3,
  },
  messageText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18.85,
    color: colors.ink,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    minHeight: 43,
    maxHeight: 120,
    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvas,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.ink,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    opacity: 0.5,
  },
});
