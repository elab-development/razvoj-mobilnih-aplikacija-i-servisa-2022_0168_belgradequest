import { BQListHeader, BQListRow } from '@/components/ui/bq-list-row';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// TODO: zameniti pravim podacima iz Supabase
const MOCK_USER = {
  username: 'KORISNIK',
  xp: 1255,
  rank: 7,
  totalUsers: 23244,
  avatar: null,
};

const COMPLETED_QUESTS = [
  { id: '1', title: 'Run the Belgrade marathon', reward: '200 XP' },
  { id: '2', title: 'Read with Nikola Tesla',   reward: '100 XP' },
  { id: '5', title: 'Buy a burek for a stranger', reward: '50 XP' },
  { id: '7', title: 'Pet a stray cat',           reward: '25 XP' },
  { id: '6', title: 'Eat some ćevapi',           reward: '25 XP'},
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Avatar + info */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {MOCK_USER.avatar ? (
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatarImg} />
          ) : (
            <Ionicons name="person" size={40} color={BQ.grey} />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{MOCK_USER.username}</Text>
          <Text style={styles.xp}>{MOCK_USER.xp} xp</Text>
          <Text style={styles.rank}>
            rank{' '}
            <Text style={styles.rankHighlight}>#{MOCK_USER.rank}</Text>
            {' '}out of {MOCK_USER.totalUsers}
          </Text>
        </View>
      </View>

      {/* Completed quests lista */}
      <View style={styles.listWrap}>
        <Text style={styles.sectionTitle}>COMPLETED QUESTS</Text>
        <BQListHeader left="Title" right="Reward" />
        <FlatList
          data={COMPLETED_QUESTS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BQListRow
              title={item.title}
              value={item.reward}
              muted={(item as any).muted}
            />
          )}
        />
      </View>

      {/* Dugmad dole */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => router.push('/(tabs)/profile/friends')}  
        >
          <Ionicons name="people-outline" size={24} color={BQ.white} />
        </TouchableOpacity>

        <View style={styles.footerRight}>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => router.push('/(tabs)/profile/edit')}
          >
            <Ionicons name="create-outline" size={24} color={BQ.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => {/* TODO: logout */ router.replace('/(auth)/login'); }}
          >
            <Ionicons name="log-out-outline" size={24} color={BQ.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BQ.black,
    paddingTop: 70,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: 72, height: 72, borderRadius: Radius.pill },
  userInfo: { gap: 2 },
  username: {
    color: BQ.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  xp: { color: BQ.grey, fontSize: 14 },
  rank: { color: BQ.grey, fontSize: 13 },
  rankHighlight: { color: BQ.green, fontWeight: '700' },

  // Lista
  listWrap: {
    flex: 1,
    backgroundColor: BQ.darkGreen,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    color: BQ.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  listContent: { paddingBottom: Spacing.xl },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BQ.black,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  footerRight: { flexDirection: 'row', gap: Spacing.sm },
  footerBtn: {
    width: 52,
    height: 52,
    backgroundColor: BQ.darkGreen,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});