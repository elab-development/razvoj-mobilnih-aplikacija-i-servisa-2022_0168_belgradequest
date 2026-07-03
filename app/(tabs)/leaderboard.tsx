import { BQListRow } from '@/components/ui/bq-list-row';
import { BQSearchInput } from '@/components/ui/bq-search-input';
import { getRankedFriends } from '@/constants/mock-friends';
import { BQ, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function LeaderboardScreen() {
  const [query, setQuery] = useState('');
  const rankedFriends = getRankedFriends();

  const filteredFriends = useMemo(() => {
    if (!query.trim()) return rankedFriends;
    return rankedFriends.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [query, rankedFriends]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require('@/assets/images/Logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.listWrap}>
        <Text style={styles.pageTitle}>LEADERBOARD</Text>

        <BQSearchInput placeholder="Look up a friend here..." value={query} onChangeText={setQuery} />

        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.rankCol]}>Rank</Text>
          <Text style={[styles.headerText, styles.friendCol]}>Friend</Text>
          <Text style={[styles.headerText, styles.xpCol]}>Total XP</Text>
        </View>

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <BQListRow
              title={item.name}
              value={`${item.xp} XP`}
              style={item.isMe && styles.meCard}
              leading={
                <View style={styles.leadingWrap}>
                  <Text style={styles.rankText}>#{item.rank}</Text>
                  <View style={[styles.avatar, item.isMe && styles.avatarMe]}>
                    <Ionicons name="person" size={14} color={BQ.white} />
                  </View>
                </View>
              }
            />
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
  pageTitle: { color: BQ.orange, fontSize: 20, fontWeight: '800', textAlign: 'center', letterSpacing: 1, marginBottom: Spacing.md },
  headerRow: { flexDirection: 'row', paddingHorizontal: Spacing.xs, marginTop: Spacing.md, marginBottom: Spacing.sm },
  headerText: { color: BQ.whiteMuted, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  rankCol: { width: 56 },
  friendCol: { flex: 1 },
  xpCol: { width: 70, textAlign: 'right' },
  list: { flex: 1 },
  listContent: { paddingBottom: Spacing.xl },
  leadingWrap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  rankText: { color: BQ.grey, fontSize: 13, fontWeight: '600', width: 24 },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: BQ.green, alignItems: 'center', justifyContent: 'center' },
  avatarMe: { backgroundColor: BQ.orange },
  meCard: { borderWidth: 1, borderColor: BQ.orange },
});