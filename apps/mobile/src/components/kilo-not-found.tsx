import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { colors, fonts, screenGutter } from '@/theme';

export function KiloNotFound() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader
        title="The Kilo"
        left={{ icon: ArrowLeft, accessibilityLabel: 'Back', onPress: () => router.back() }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>This Kilo isn’t available</Text>
        <Text style={styles.body}>It may have been cancelled or removed.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    gap: 8,
    paddingHorizontal: screenGutter,
    paddingTop: 16,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },
});
