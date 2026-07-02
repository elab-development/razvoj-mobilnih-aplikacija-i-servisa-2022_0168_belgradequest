import { BQ, Radius, Spacing } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type BQListRowProps = TouchableOpacityProps & {
  title: string;
  value: string;
  muted?: boolean;
  leading?: React.ReactNode;
};

export function BQListRow({ title, value, muted = false, leading, style, ...rest }: BQListRowProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.card, muted && styles.mutedCard, style]} {...rest}>
      {leading}
      <Text style={[styles.title, muted && styles.mutedText]} numberOfLines={2}>{title}</Text>
      <Text style={[styles.value, muted && styles.mutedText]}>{value}</Text>
    </TouchableOpacity>
  );
}

export function BQListHeader({ left, right }: { left: string; right: string }) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>{left}</Text>
      <Text style={styles.headerText}>{right}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.xs, marginBottom: Spacing.sm },
  headerText: { color: BQ.whiteMuted, fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  card: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BQ.black, borderRadius: Radius.lg, paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md, marginBottom: Spacing.sm, gap: Spacing.sm, minHeight: 68,
  },
  mutedCard: { opacity: 0.45 },
  title: { color: BQ.white, fontSize: 17, fontWeight: '600', flex: 1 },
  value: { color: BQ.orange, fontSize: 15, fontWeight: '700' },
  mutedText: { color: BQ.grey },
});