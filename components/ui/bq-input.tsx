import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type BQInputProps = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string;
};

export function BQInput({ label, icon = 'person-outline', isPassword = false, error, ...rest }: BQInputProps) {
  const [hidden, setHidden] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        <Ionicons name={icon} size={18} color={BQ.grey} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholderTextColor={BQ.whiteMuted}
          secureTextEntry={hidden}
          autoCapitalize="none"
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidden(!hidden)} hitSlop={8}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={18} color={BQ.grey} />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: Spacing.md },
  label: { color: BQ.white, fontSize: 13, marginBottom: Spacing.xs, fontWeight: '500' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: BQ.black,
    borderRadius: Radius.sm, borderWidth: 1, borderColor: BQ.grey, paddingHorizontal: Spacing.sm, height: 46,
  },
  inputRowError: { borderColor: '#E5675A' },
  icon: { marginRight: Spacing.sm },
  input: { flex: 1, color: BQ.white, fontSize: 15, height: '100%' },
  error: { color: '#E5675A', fontSize: 12, marginTop: Spacing.xs },
});