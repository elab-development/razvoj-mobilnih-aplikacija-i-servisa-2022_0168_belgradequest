import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export function BQSearchInput(props: TextInputProps) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={16} color={BQ.black} style={styles.icon} />
      <TextInput placeholderTextColor="rgba(21,41,46,0.5)" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: BQ.white, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, height: 44 },
  icon: { marginRight: Spacing.sm },
  input: { flex: 1, color: BQ.black, fontSize: 14, height: '100%' },
});