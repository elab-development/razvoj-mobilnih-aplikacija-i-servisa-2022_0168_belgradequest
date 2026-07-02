import { BQButton } from '@/components/ui/bq-button';
import { BQInput } from '@/components/ui/bq-input';
import { BQLogo } from '@/components/ui/bq-logo';
import { BQ, Spacing } from '@/constants/theme';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: povezati sa pravim API-jem kad baza bude spremna
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
          <BQInput label="Password" icon="lock-closed-outline" placeholder="Enter password" isPassword value={password} onChangeText={setPassword} />
          <BQButton title="Log in" onPress={handleLogin} style={styles.button} />
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
});