import { BQButton } from '@/components/ui/bq-button';
import { BQInput } from '@/components/ui/bq-input';
import { BQLogo } from '@/components/ui/bq-logo';
import { BQ, Spacing } from '@/constants/theme';
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // TODO: povezati sa API-jem
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <BQLogo withDivider />
        </View>

        <View style={styles.form}>
          <BQInput
            label="Username"
            icon="person-outline"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />

          <BQInput
            label="Email"
            icon="mail-outline"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />

          <BQInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter password"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          <BQInput
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Confirm password"
            isPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <BQButton
            title="Create account"
            onPress={handleRegister}
            style={styles.button}
          />

          <Link href="/(auth)/login" style={styles.link}>
            <Text style={styles.linkText}>
              Already have an account? Log in
            </Text>
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
});