import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, screenGutter } from '@/theme';

interface PlaceholderScreenProps {
  title: string;
  description: string;
}

// For tabs that exist in the navigation but have no design yet.
export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
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
    paddingTop: 24,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.ink,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.muted,
  },
});
