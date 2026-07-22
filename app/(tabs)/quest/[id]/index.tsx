import { QuestTabHeader } from '@/components/ui/quest-tab-header';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { formatExpiry, useQuest } from '@/hooks/use-quests';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function QuestDescriptionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { quest, loading, error } = useQuest(id);

  if (loading) {
    return (
      <View style={styles.notFound}>
        <ActivityIndicator color={BQ.green} />
      </View>
    );
  }

  if (error || !quest) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>{error ?? 'Quest nije pronađen'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <QuestTabHeader questId={quest.id} title={quest.title} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={40} color={BQ.grey} />
        </View>
        <Text style={styles.description}>{quest.description}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Reward</Text>
          <Text style={styles.infoValue}>{quest.reward_xp} XP</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Expires</Text>
          <Text style={styles.infoValue}>{formatExpiry(quest.expires_at)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BQ.darkGreen },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  imagePlaceholder: { height: 180, borderRadius: Radius.lg, backgroundColor: BQ.black, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  description: { color: BQ.white, fontSize: 15, lineHeight: 22, marginBottom: Spacing.lg },
  infoCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: BQ.black, borderRadius: Radius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  infoLabel: { color: BQ.whiteMuted, fontSize: 13, fontWeight: '600' },
  infoValue: { color: BQ.orange, fontSize: 14, fontWeight: '700' },
  notFound: { flex: 1, backgroundColor: BQ.darkGreen, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: BQ.white },
});