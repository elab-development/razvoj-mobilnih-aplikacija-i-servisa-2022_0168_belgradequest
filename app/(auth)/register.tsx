import { BQButton } from '@/components/ui/bq-button';
import { BQInput } from '@/components/ui/bq-input';
import { BQLogo } from '@/components/ui/bq-logo';
import { BQ, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    if (!username.trim() || !email.trim() || !password) {
      setError('Popuni sva polja.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email.trim(), password, username.trim());
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
          <BQInput label="Username" icon="person-outline" placeholder="Enter username" value={username} onChangeText={setUsername} />
          <BQInput label="Email" icon="mail-outline" placeholder="Enter email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <BQInput label="Password" icon="lock-closed-outline" placeholder="Enter password" isPassword value={password} onChangeText={setPassword} />
          <BQInput label="Confirm Password" icon="lock-closed-outline" placeholder="Confirm password" isPassword value={confirmPassword} onChangeText={setConfirmPassword} />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <BQButton title="Create account" onPress={handleRegister} loading={loading} style={styles.button} />
          <Link href="/(auth)/login" style={styles.link}>
            <Text style={styles.linkText}>Already have an account? Log in</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: BQ.darkGreen,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.xxl,
  },

  logoWrap: {
    alignItems: 'center',
  },

  form: {
    width: '100%',
  },

  button: {
    marginTop: Spacing.sm,
  },

  link: {
    marginTop: Spacing.lg,
    alignSelf: 'center',
  },

  linkText: {
    color: BQ.orange,
    fontSize: 14,
    fontWeight: '600',
  },
  error: { color: '#E5675A', fontSize: 13, textAlign: 'center' },
});