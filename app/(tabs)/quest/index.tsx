import { BQListHeader, BQListRow } from '@/components/ui/bq-list-row';
import { QUESTS } from '@/constants/mock-quests';
import { BQ, Spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export default function QuestListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require('@/assets/images/Logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.listWrap}>
        <BQListHeader left="Title" right="Reward" />
        <FlatList
          data={QUESTS}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link href={`/quest/${item.id}`} asChild>
              <BQListRow title={item.title} value={item.reward} />
            </Link>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BQ.darkGreen, paddingTop: 60 },
  logoWrap: { alignItems: 'center', marginBottom: Spacing.md },
  logo: { width: 150, height: 100 },
  listWrap: { flex: 1, paddingHorizontal: Spacing.lg },
  list: { flex: 1 },
  listContent: { paddingBottom: Spacing.xl },
});