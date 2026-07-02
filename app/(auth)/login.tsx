import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log In</ThemedText>

      <Link href="/(tabs)" style={styles.link}>
        <ThemedText type="link">(privremeno) Uđi na Main Page</ThemedText>
      </Link>
      <Link href="/(auth)/register" style={styles.link}>
        <ThemedText type="link">Create account</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 20 },
  link: { marginTop: 12 },
});