import { Stack } from 'expo-router';

export default function QuestLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Description' }} />
      <Stack.Screen name="map" options={{ title: 'Map' }} />
      <Stack.Screen name="submit" options={{ title: 'Submit' }} />
    </Stack>
  );
}