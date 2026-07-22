import { BQ } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      router.replace(session ? '/(tabs)/quest' : '/(auth)/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading, session]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/Logo.png')}
          style={styles.large}
          resizeMode="contain"
              />
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
   large: { width: 500, height: 300 },
  
});