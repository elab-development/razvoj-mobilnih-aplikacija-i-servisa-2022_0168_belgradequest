import { BQListHeader, BQListRow } from '@/components/ui/bq-list-row';
import { BQ, Spacing } from '@/constants/theme';
import { useQuests } from '@/hooks/use-quests';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function QuestListScreen() {
  const { quests, loading, error } = useQuests();
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require('@/assets/images/Logo2.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.listWrap}>
        <BQListHeader left="Title" right="Reward" />
        {loading && <ActivityIndicator color={BQ.green} style={styles.centerBox} />}

        {!loading && error && <Text style={styles.errorText}>Greška pri učitavanju questova: {error}</Text>}

        {!loading && !error && quests.length === 0 && (
          <Text style={styles.emptyText}>Trenutno nema dostupnih questova.</Text>
        )}

        {!loading && !error && quests.length > 0 && (
        <FlatList
          data={quests}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link href={`/quest/${item.id}`} asChild>
              <BQListRow title={item.title} value={`${item.reward_xp} XP`} />
            </Link>
          )}
        />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BQ.darkGreen, paddingTop: 60 },
  logoWrap: { alignItems: 'center', marginBottom: Spacing.md },
  logo: { width: 176, height: 100 },
  listWrap: { flex: 1, paddingHorizontal: Spacing.lg },
  list: { flex: 1 },
  listContent: { paddingBottom: Spacing.xl },
  centerBox: { marginTop: Spacing.xl },
  errorText: { color: '#E5675A', textAlign: 'center', marginTop: Spacing.lg },
  emptyText: { color: BQ.grey, textAlign: 'center', marginTop: Spacing.lg },
});