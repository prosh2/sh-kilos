import { MapPin, Maximize2 } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, iconStroke, radius } from '@/theme';

// Illustrated stand-in for the meeting point map, drawn as in the design.
// Replace with a real map once the map provider decision is made (roadmap, Phase 2).
export function MeetingPointMapPlaceholder() {
  return (
    <View style={styles.map} accessible accessibilityLabel="Map of the meeting point (placeholder)">
      <View style={styles.park} />
      <View style={[styles.road, styles.parkPathMain]} />
      <View style={[styles.road, styles.parkPathLower]} />
      <View style={[styles.road, styles.parkPathUpper]} />
      <View style={[styles.road, styles.street]} />
      <View style={[styles.road, styles.streetLower]} />
      <View style={[styles.approach, styles.approachVertical]} />
      <View style={[styles.approach, styles.approachHorizontal]} />
      <Text style={styles.parkName}>Victoria Park</Text>
      <Text style={styles.area}>EAST SIDE</Text>
      <Text style={styles.streetName}>Cadogan Terrace</Text>
      <View style={styles.pin}>
        <MapPin size={17} color={colors.white} {...iconStroke} />
      </View>
      <View style={styles.pinLabel}>
        <Text style={styles.pinLabelText}>Meet here</Text>
      </View>
      <Pressable style={styles.expand} accessibilityRole="button" accessibilityLabel="Expand map">
        <Maximize2 size={15} color={colors.ink} {...iconStroke} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 176,
    borderRadius: radius.lg,
    backgroundColor: colors.mapLand,
    overflow: 'hidden',
  },
  park: {
    position: 'absolute',
    left: -20,
    top: -12,
    width: 280,
    height: 205,
    borderRadius: 70,
    backgroundColor: colors.forestSoft,
  },
  road: {
    position: 'absolute',
    backgroundColor: colors.mapRoad,
  },
  parkPathMain: {
    left: -8,
    top: 95.5,
    width: 260,
    height: 6,
    transform: [{ rotate: '-2deg' }],
  },
  parkPathLower: {
    left: 82.6,
    top: 132.8,
    width: 79,
    height: 5,
    transform: [{ rotate: '-44deg' }],
  },
  parkPathUpper: {
    left: 138.3,
    top: 40.25,
    width: 126,
    height: 5,
    transform: [{ rotate: '58deg' }],
  },
  street: {
    left: 246,
    top: -6,
    width: 17,
    height: 190,
  },
  streetLower: {
    left: 251.1,
    top: 148.6,
    width: 124,
    height: 14,
    transform: [{ rotate: '9deg' }],
  },
  approach: {
    position: 'absolute',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  approachVertical: {
    left: 252,
    top: 104,
    width: 3,
    height: 73,
  },
  approachHorizontal: {
    left: 220,
    top: 103,
    width: 35,
    height: 3,
  },
  parkName: {
    position: 'absolute',
    left: 42,
    top: 47,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.forest,
  },
  area: {
    position: 'absolute',
    left: 43,
    top: 69,
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.forest,
  },
  streetName: {
    position: 'absolute',
    left: 237.5,
    top: 60,
    width: 74,
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
  },
  pin: {
    position: 'absolute',
    left: 202,
    top: 78,
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 3,
    borderColor: colors.surface,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLabel: {
    position: 'absolute',
    left: 160,
    top: 119,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  pinLabelText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.ink,
  },
  expand: {
    position: 'absolute',
    left: 306,
    top: 129,
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
