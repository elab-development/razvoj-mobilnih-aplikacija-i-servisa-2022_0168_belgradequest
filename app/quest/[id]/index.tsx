import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function QuestDescriptionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Quest #{id} — Description</ThemedText>
      <Link href={`/quest/${id}/map` as any}><ThemedText type="link">Map →</ThemedText></Link>
      <Link href={`/quest/${id}/submit` as any}><ThemedText type="link">Submit →</ThemedText></Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20, gap: 12 } }); 