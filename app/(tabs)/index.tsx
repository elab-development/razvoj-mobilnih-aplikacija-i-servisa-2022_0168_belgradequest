import { Link } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const PLACEHOLDER_QUESTS = [
  { id: '1', title: 'Read with Nikola Tesla', reward: 100 },
  { id: '2', title: 'Below Vukov Spomenik', reward: 100 },
  { id: '3', title: 'Eat some ćevapi', reward: 25 },
];

export default function QuestListScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">belgrade quest</ThemedText>
      <FlatList
        data={PLACEHOLDER_QUESTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/quest/${item.id}`} style={styles.row}>
            <ThemedText>{item.title}</ThemedText>
            <ThemedText>{item.reward} XP</ThemedText>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
});