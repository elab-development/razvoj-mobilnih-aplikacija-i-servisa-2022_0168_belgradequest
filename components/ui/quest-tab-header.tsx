import { BQ, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type QuestTabHeaderProps = { questId: string; title: string };

const TABS = [
  { key: 'description', label: 'Description', path: '' },
  { key: 'map', label: 'Map', path: '/map' },
  { key: 'submit', label: 'Submit', path: '/submit' },
];

export function QuestTabHeader({ questId, title }: QuestTabHeaderProps) {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={22} color={BQ.white} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => {
          const target = `/quest/${questId}${tab.path}`;
          const isActive = pathname === target;
          return (
            <TouchableOpacity key={tab.key} onPress={() => router.replace(target as never)} style={styles.tabButton}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
              {isActive && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, paddingHorizontal: Spacing.md, backgroundColor: BQ.black },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  title: { color: BQ.white, fontSize: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, flex: 1, textAlign: 'center' },
  spacer: { width: 22 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  tabButton: { paddingBottom: Spacing.sm, alignItems: 'center', flex: 1 },
  tabText: { color: BQ.whiteMuted, fontSize: 15, fontWeight: '600' },
  tabTextActive: { color: BQ.orange },
  tabIndicator: { marginTop: 6, height: 2, width: '60%', backgroundColor: BQ.orange, borderRadius: 2 },
});