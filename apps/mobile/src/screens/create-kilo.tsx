import { router } from 'expo-router';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Info,
  MapPin,
  X,
} from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { FormField, SelectField, TextField } from '@/components/form-field';
import { ScreenHeader } from '@/components/screen-header';
import { sportIcons } from '@/components/sport-icon';
import { Toggle } from '@/components/toggle';
import type { Sport } from '@/data/types';
import { sportLabels, sportVerb } from '@/utils/format';
import { colors, fonts, iconStroke, radius, screenGutter } from '@/theme';

const sportRows: Sport[][] = [
  ['run', 'ride', 'swim'],
  ['triathlon', 'duathlon', 'other'],
];

const pacePlaceholders: Record<Sport, string> = {
  run: 'e.g. 6:00–6:30 min/km',
  ride: 'e.g. 22–25 km/h',
  swim: 'e.g. 2:00–2:15 min/100m',
  triathlon: 'e.g. 6:00–6:30 min/km',
  duathlon: 'e.g. 6:00–6:30 min/km',
  other: 'e.g. 6:00–6:30 min/km',
};

export function CreateKilo() {
  // Local form state only; validation and saving come with the Phase 2 spec.
  const [sport, setSport] = useState<Sport>('run');
  const [title, setTitle] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [capacity, setCapacity] = useState('');
  const [notes, setNotes] = useState('');
  const [noDrop, setNoDrop] = useState(true);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="Create a Kilo"
        left={{ icon: X, accessibilityLabel: 'Close', onPress: () => router.back() }}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.introduction}>
            <Text style={styles.headline}>Your Kilo.{'\n'}Better with company.</Text>
            <Text style={styles.supporting}>Share the plan. Help people find their fit.</Text>
          </View>

          <View style={styles.form}>
            <FormField label="Sport">
              <View style={styles.sportRows}>
                {sportRows.map((row) => (
                  <View key={row.join()} style={styles.sportRow}>
                    {row.map((option) => (
                      <Chip
                        key={option}
                        label={sportLabels[option]}
                        icon={sportIcons[option]}
                        selected={sport === option}
                        onPress={() => setSport(option)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </FormField>

            <FormField label="Give your Kilo a name">
              <TextField
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Sunday canal spin"
                maxLength={80}
                accessibilityLabel="Kilo name"
              />
            </FormField>

            <View style={styles.row}>
              <FormField label="Date" style={styles.flex}>
                <SelectField
                  placeholder="Pick a date"
                  trailingIcon={CalendarDays}
                  accessibilityLabel="Date"
                />
              </FormField>
              <FormField label="Start time" style={styles.narrow}>
                <SelectField
                  placeholder="Time"
                  trailingIcon={Clock3}
                  accessibilityLabel="Start time"
                />
              </FormField>
            </View>

            <View style={styles.meetingPoint}>
              <FormField label="Meeting point">
                <SelectField
                  placeholder="Choose on the map"
                  trailingIcon={MapPin}
                  accessibilityLabel="Meeting point"
                />
              </FormField>
              <Text style={styles.hint}>Pick a public place that’s easy to find.</Text>
            </View>

            <View style={styles.row}>
              <FormField label="Distance" style={styles.narrow}>
                <TextField
                  value={distanceKm}
                  onChangeText={setDistanceKm}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  suffix="km"
                  accessibilityLabel="Distance in km"
                />
              </FormField>
              <FormField label="Expected pace" style={styles.flex}>
                <SelectField
                  placeholder={pacePlaceholders[sport]}
                  trailingIcon={ChevronDown}
                  accessibilityLabel="Expected pace"
                />
              </FormField>
            </View>

            <View style={styles.guidance}>
              <Info size={14} color={colors.forest} {...iconStroke} />
              <Text style={styles.guidanceText}>Set the pace you want to chase today.</Text>
            </View>

            <FormField label="Max participants" style={styles.narrow}>
              <TextField
                value={capacity}
                onChangeText={setCapacity}
                placeholder="No limit"
                keyboardType="number-pad"
                accessibilityLabel="Maximum participants, optional"
              />
            </FormField>

            <FormField label="Anything your group should know?">
              <TextField
                value={notes}
                onChangeText={setNotes}
                placeholder="Route, stops, what to bring…"
                multiline
                maxLength={1000}
                accessibilityLabel="Notes for the group"
              />
            </FormField>

            <View style={styles.noDrop}>
              <View style={styles.flex}>
                <Text style={styles.noDropTitle}>Make it a no-drop Kilo</Text>
                <Text style={styles.noDropDescription}>
                  We wait. We regroup. We {sportVerb(sport)} together.
                </Text>
              </View>
              <Toggle value={noDrop} onValueChange={setNoDrop} accessibilityLabel="No-drop Kilo" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomBar caption="Visible to nearby athletes. You’ll host the group.">
        {/* Posting arrives with the backend; for now this just closes the form. */}
        <Button label="Post Kilo" icon={ArrowRight} onPress={() => router.back()} />
      </BottomBar>
    </SafeAreaView>
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
  content: {
    gap: 22,
    paddingHorizontal: screenGutter,
    paddingTop: 14,
    paddingBottom: 24,
  },
  introduction: {
    gap: 8,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 30.8,
    color: colors.ink,
  },
  supporting: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
  form: {
    gap: 16,
  },
  sportRows: {
    gap: 8,
    paddingTop: 2,
  },
  sportRow: {
    flexDirection: 'row',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  narrow: {
    width: 112,
  },
  meetingPoint: {
    gap: 16,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  guidance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  guidanceText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.forest,
  },
  noDrop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.forestSoft,
  },
  noDropTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 4,
  },
  noDropDescription: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.forest,
  },
});
