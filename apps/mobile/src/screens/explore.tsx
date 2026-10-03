import { router } from 'expo-router';
import { CalendarDays, ChevronDown, Gauge, MapPin, SlidersHorizontal } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
import { KiloCard } from '@/components/kilo-card';
import { kilos } from '@/data/placeholder';
import { colors, fonts, iconStroke, screenGutter } from '@/theme';

export function Explore() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.brandBar}>
        <Text style={styles.wordmark} accessibilityRole="header" accessibilityLabel="Kilos">
          kilos<Text style={styles.wordmarkDot}>.</Text>
        </Text>
        {/* Area picker is a placeholder; "near you" comes from the server in Phase 3. */}
        <Pressable
          style={styles.location}
          accessibilityRole="button"
          accessibilityLabel="Change area, current area East London"
        >
          <MapPin size={15} color={colors.accent} {...iconStroke} />
          <Text style={styles.locationLabel}>East London</Text>
          <ChevronDown size={14} color={colors.ink} {...iconStroke} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introduction}>
          <Text style={styles.headline}>Find your people.{'\n'}Find your pace.</Text>
          <Text style={styles.supporting}>Good company for your next Kilo.</Text>
        </View>

        {/* Filters are presentational until the browse spec (Phase 3). */}
        <View style={styles.filters}>
          <View style={styles.filterRow}>
            <Chip label="All sports" icon={SlidersHorizontal} selected />
            <Chip label="This week" icon={CalendarDays} />
          </View>
          <View style={styles.filterRow}>
            <Chip label="Within 5 km" icon={MapPin} />
            <Chip label="Any pace" icon={Gauge} />
          </View>
        </View>

        <View style={styles.resultsHeading}>
          <Text style={styles.sectionTitle}>Upcoming near you</Text>
          <Text style={styles.resultsCount}>
            {kilos.length} {kilos.length === 1 ? 'Kilo' : 'Kilos'}
          </Text>
        </View>

        <View style={styles.results}>
          {kilos.map((kilo, index) => (
            <KiloCard
              key={kilo.id}
              kilo={kilo}
              variant={index === 0 ? 'photo' : 'compact'}
              onPress={() => router.push({ pathname: '/kilos/[id]', params: { id: kilo.id } })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  brandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenGutter,
    paddingVertical: 12,
  },
  wordmark: {
    fontFamily: fonts.extrabold,
    fontSize: 30,
    color: colors.ink,
  },
  wordmarkDot: {
    color: colors.accent,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.ink,
  },
  content: {
    gap: 20,
    paddingHorizontal: screenGutter,
    paddingTop: 12,
    paddingBottom: 20,
  },
  introduction: {
    gap: 8,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 35,
    lineHeight: 37.8,
    color: colors.ink,
  },
  supporting: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
  filters: {
    gap: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  resultsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.ink,
  },
  resultsCount: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  results: {
    gap: 12,
  },
});
