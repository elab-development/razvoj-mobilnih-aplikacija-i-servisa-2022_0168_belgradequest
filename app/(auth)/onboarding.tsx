import { BQ } from '@/constants/theme';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
                  source={require('@/assets/images/Logo.png')}
                  style={styles.large}
                  resizeMode="contain"
                      />
      </View>

      {/* Tagline */}
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>EXPLORE CITY</Text>
        <Text style={[styles.tagline, styles.taglineMuted]}>SOLVE QUESTS</Text>
        <Text style={[styles.tagline, styles.taglineMuted]}>COLLECT POINTS</Text>
      </View>

      {/* Dugme */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 32,
  },
  logoContainer: {
    alignItems: 'center',
  },
  taglineContainer: {
    alignItems: 'center',
    gap: 6,
  },
  tagline: {
    color: BQ.white,
    fontSize: 16,
    letterSpacing: 3,
    fontWeight: '600',
  },
  taglineMuted: {
    color: BQ.whiteMuted,
  },
  button: {
    backgroundColor: BQ.black,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: BQ.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
   large: { width: 500, height: 200}
});