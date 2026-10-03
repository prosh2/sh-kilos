import { router } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { CirclePlus, CircleUserRound, Compass, Users, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, iconStroke } from '@/theme';

type TabItem =
  | { kind: 'tab'; routeName: string; label: string; icon: LucideIcon }
  | { kind: 'action'; label: string; icon: LucideIcon; onPress: () => void };

// "Create" isn't a tab: it opens the Create a Kilo screen over the tabs.
const items: TabItem[] = [
  { kind: 'tab', routeName: 'index', label: 'Explore', icon: Compass },
  { kind: 'tab', routeName: 'my-kilos', label: 'My Kilos', icon: Users },
  { kind: 'action', label: 'Create', icon: CirclePlus, onPress: () => router.push('/kilos/new') },
  { kind: 'tab', routeName: 'profile', label: 'Profile', icon: CircleUserRound },
];

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const focusedRouteName = state.routes[state.index]?.name;

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {items.map((item) => {
        const focused = item.kind === 'tab' && item.routeName === focusedRouteName;
        const color = focused ? colors.accent : colors.muted;
        const Icon = item.icon;

        const onPress = () => {
          if (item.kind === 'action') {
            item.onPress();
            return;
          }
          const route = state.routes.find((r) => r.name === item.routeName);
          if (!route) return;
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={item.label}
            onPress={onPress}
            accessibilityRole={item.kind === 'tab' ? 'tab' : 'button'}
            accessibilityState={item.kind === 'tab' ? { selected: focused } : undefined}
            style={styles.item}
          >
            <Icon size={21} color={color} {...iconStroke} />
            <Text style={[styles.label, { color }, focused && styles.labelFocused]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 18,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {
    width: 74,
    alignItems: 'center',
    gap: 5,
    paddingBottom: 14,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 10,
  },
  labelFocused: {
    fontFamily: fonts.semibold,
  },
});
