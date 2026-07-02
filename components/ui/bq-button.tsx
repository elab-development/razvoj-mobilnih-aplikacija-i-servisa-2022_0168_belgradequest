import { BQ, Radius } from '@/constants/theme';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type BQButtonVariant = 'primary' | 'outline';

type BQButtonProps = {
  title: string;
  onPress: () => void;
  variant?: BQButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function BQButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: BQButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? BQ.green : BQ.white} />
      ) : (
        <Text style={[styles.text, isOutline && styles.textOutline]}>
          {title.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: { backgroundColor: BQ.black },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: BQ.green },
  disabled: { opacity: 0.5 },
  text: { color: BQ.white, fontSize: 14, fontWeight: '700', letterSpacing: 2 },
  textOutline: { color: BQ.green },
});