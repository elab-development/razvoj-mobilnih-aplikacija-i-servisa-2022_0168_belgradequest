import { Tabs, usePathname } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const activeColor = Colors[colorScheme ?? 'dark'].tabIconSelected;
  const inactiveColor = Colors[colorScheme ?? 'dark'].tabIconDefault;

  const isQuestsActive = pathname.includes('/quest') || pathname === '/';
  const isLeaderboardActive = pathname.includes('leaderboard');
  const isProfileActive = pathname.includes('profile');
  const isFeedbackActive = pathname.includes('feedback');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="quest"
        options={{
          title: 'Quests',
          tabBarIcon: () => (
            <IconSymbol size={28} name="mappin.and.ellipse" color={isQuestsActive ? activeColor : inactiveColor} />
          ),
          tabBarLabelStyle: { color: isQuestsActive ? activeColor : inactiveColor },
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: () => (
            <IconSymbol size={28} name="chart.bar.fill" color={isLeaderboardActive ? activeColor : inactiveColor} />
          ),
          tabBarLabelStyle: { color: isLeaderboardActive ? activeColor : inactiveColor },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <IconSymbol size={28} name="person.fill" color={isProfileActive ? activeColor : inactiveColor} />
          ),
          tabBarLabelStyle: { color: isProfileActive ? activeColor : inactiveColor },
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: () => (
            <IconSymbol size={28} name="bubble.left.fill" color={isFeedbackActive ? activeColor : inactiveColor} />
          ),
          tabBarLabelStyle: { color: isFeedbackActive ? activeColor : inactiveColor },
        }}
      />
      <Tabs.Screen name="profile/friends" options={{ href: null }} />
      <Tabs.Screen name="profile/edit" options={{ href: null }} />
    </Tabs>
  );
}