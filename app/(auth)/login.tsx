import { BQButton } from '@/components/ui/bq-button';
import { BQInput } from '@/components/ui/bq-input';
import { BQLogo } from '@/components/ui/bq-logo';
import { BQ, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    router.replace('/(tabs)/quest');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoWrap}>
          <BQLogo withDivider />
        </View>

        <View style={styles.form}>
          <BQInput
            label="Email"
            icon="mail-outline"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <BQInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter password"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <BQButton title="Log in" onPress={handleLogin} loading={loading} style={styles.button} />
          <Link href="/(auth)/register" style={styles.link}>
            <Text style={styles.linkText}>Create account</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BQ.darkGreen },
  container: { flexGrow: 1, justifyContent: 'center', padding: Spacing.lg, gap: Spacing.xxl },
  logoWrap: { alignItems: 'center' },
  form: { width: '100%' },
  button: { marginTop: Spacing.sm },
  link: { marginTop: Spacing.lg, alignSelf: 'center' },
  linkText: { color: BQ.orange, fontSize: 14, fontWeight: '600' },
  error: { color: '#E5675A', fontSize: 13, textAlign: 'center' },
});