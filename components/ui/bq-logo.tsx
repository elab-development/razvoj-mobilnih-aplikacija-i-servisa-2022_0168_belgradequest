import { BQ } from '@/constants/theme';
import { Image, StyleSheet, View } from 'react-native';

type BQLogoProps = { size?: 'small' | 'large'; withDivider?: boolean };

export function BQLogo({}: BQLogoProps) {
  

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/questBanner.png')}
        style={styles.large}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  large: { width: 330, height: 130 },
  small: { width: 160, height: 65 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  dash: { width: 14, height: 3, borderRadius: 2, backgroundColor: BQ.orange },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: BQ.orange, marginLeft: 4 },
});