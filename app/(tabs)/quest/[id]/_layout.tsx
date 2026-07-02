import { Stack } from 'expo-router';

export default function QuestLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="map" />
      <Stack.Screen name="submit" />
    </Stack>
  );
}