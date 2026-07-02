import { BQ } from '@/constants/theme';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Ovde ćemo ubaciti pravi logo kad dodaš assets */}
        <Text style={styles.logoSmall}>belgrade</Text>
        <Text style={styles.logoLarge}>quest</Text>
      </View>
      <ActivityIndicator
        color={BQ.green}
        size="large"
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoSmall: {
    color: BQ.white,
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: '300',
  },
  logoLarge: {
    color: BQ.white,
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1,
  },
  loader: {
    position: 'absolute',
    bottom: 80,
  },
});