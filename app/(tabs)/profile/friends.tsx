import { BQButton } from '@/components/ui/bq-button';
import { BQListRow } from '@/components/ui/bq-list-row';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList, Modal, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';

// TODO: zameniti pravim podacima iz Supabase
const MOCK_USER = { username: 'KORISNIK', xp: 1255, rank: 7, totalUsers: 23244, friendCode: '0945667' };

const MOCK_FRIENDS = [
  { id: 'f1', username: 'Korisnik5', xp: '1025 XP' },
  { id: 'f2', username: 'Korisnik3', xp: '200 XP'  },
  { id: 'f3', username: 'Korisnik4', xp: '25 XP'},
];

export default function FriendsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  const handleAdd = () => {
    // TODO: Supabase lookup po friend code-u
    setModalVisible(false);
    setFriendCode('');
  };

  return (
    <View style={styles.container}>
      {/* Header sa back dugmetom */}
      <View style={styles.topBar}>
        
      </View>

      {/* Avatar + info (isti kao na Profile) */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={BQ.grey} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{MOCK_USER.username}</Text>
          <Text style={styles.xp}>{MOCK_USER.xp} xp</Text>
          <Text style={styles.rank}>
            rank <Text style={styles.rankHighlight}>#{MOCK_USER.rank}</Text> out of {MOCK_USER.totalUsers}
          </Text>
        </View>
      </View>

      {/* Friend code */}
      <View style={styles.codeSection}>
        <Text style={styles.codeLabel}>YOUR CODE:</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{MOCK_USER.friendCode}</Text>
        </View>
      </View>

      {/* Lista prijatelja */}
      <View style={styles.listWrap}>
        <FlatList
          data={MOCK_FRIENDS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BQListRow
              title={item.username}
              value={item.xp}
              muted={(item as any).muted}
              leading={
                <View style={styles.friendAvatar}>
                  <Ionicons name="person" size={20} color={BQ.grey} />
                </View>
              }
            />
          )}
        />

        <BQButton
          title="Add Friends"
          variant="outline"
          onPress={() => setModalVisible(true)}
          style={styles.addBtn}
        />
      </View>

      {/* Footer dugmad */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.navigate('/(tabs)/profile')}>
          <Ionicons name="list-outline" size={24} color={BQ.white} />
        </TouchableOpacity>
        <View style={styles.footerRight}>
          <TouchableOpacity style={styles.footerBtn} onPress={() => {/* TODO: edit */ }}>
            <Ionicons name="create-outline" size={24} color={BQ.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Ionicons name="log-out-outline" size={24} color={BQ.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal za dodavanje prijatelja */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={20} color={BQ.white} />
            </TouchableOpacity>

            <TextInput
              style={styles.modalInput}
              placeholder="Type your friend's code here"
              placeholderTextColor={BQ.whiteMuted}
              value={friendCode}
              onChangeText={setFriendCode}
              autoCapitalize="none"
            />
            <BQButton title="Add" onPress={handleAdd} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BQ.black, paddingTop: 5 },

  topBar: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  avatar: {
    width: 72, height: 72, borderRadius: Radius.pill,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center', alignItems: 'center',
  },
  userInfo: { gap: 2 },
  username: { color: BQ.white, fontSize: 18, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  xp: { color: BQ.grey, fontSize: 14 },
  rank: { color: BQ.grey, fontSize: 13 },
  rankHighlight: { color: BQ.green, fontWeight: '700' },

  codeSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  codeLabel: {
    color: BQ.white, fontSize: 13, fontWeight: '800',
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: Spacing.xs,
  },
  codeBox: {
    backgroundColor: BQ.black, borderWidth: 1, borderColor: BQ.green,
    borderRadius: Radius.sm, paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl, width: '100%', alignItems: 'center',
  },
  codeText: { color: BQ.white, fontSize: 18, fontWeight: '700', letterSpacing: 3 },

  listWrap: {
    flex: 1, backgroundColor: BQ.darkGreen,
    borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg,
    paddingTop: Spacing.md, paddingHorizontal: Spacing.lg,
  },
  listContent: { paddingBottom: Spacing.md },
  friendAvatar: {
    width: 36, height: 36, borderRadius: Radius.pill,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center', alignItems: 'center',
  },
  addBtn: { marginTop: Spacing.sm, marginBottom: Spacing.md, backgroundColor: BQ.orange, borderColor: BQ.orange, borderWidth: 1 },

  footer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: BQ.black, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
  },
  footerRight: { flexDirection: 'row', gap: Spacing.sm },
  footerBtn: {
    width: 52, height: 52, backgroundColor: BQ.darkGreen,
    borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center', padding: Spacing.lg,
  },
  modalBox: {
    backgroundColor: BQ.black, borderRadius: Radius.lg,
    padding: Spacing.lg, width: '100%', gap: Spacing.md,
  },
  modalClose: { alignSelf: 'flex-end' },
  modalInput: {
    backgroundColor: BQ.darkGreen, color: BQ.white,
    borderRadius: Radius.sm, paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, fontSize: 15,
    borderWidth: 1, borderColor: BQ.grey,
  },
});