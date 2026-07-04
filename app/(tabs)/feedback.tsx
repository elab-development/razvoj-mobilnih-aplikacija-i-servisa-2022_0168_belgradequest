import { BQ, Radius, Spacing } from '@/constants/theme';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FeedbackScreen() {
  const [idea, setIdea] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!idea.trim()) {
      Alert.alert('Oops', 'Please type your idea first.');
      return;
    }
    setSubmitting(true);
    // TODO: Supabase insert kad baza bude gotova
    setTimeout(() => {
      setIdea('');
      setSubmitting(false);
      Alert.alert('Thank you!', 'Your idea has been submitted.');
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Image
            source={require('@/assets/images/Logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>HELP US IMPROVE!</Text>
          <Text style={styles.cardSubtitle}>
            We love hearing new ideas! If you have a new interesting quest to
            suggest, we'd love to hear it.
          </Text>

          <TextInput
            style={styles.textarea}
            placeholder="Type your idea here..."
            placeholderTextColor={BQ.whiteMuted}
            value={idea}
            onChangeText={setIdea}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.button, submitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {submitting ? 'SUBMITTING...' : 'SUBMIT'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BQ.darkGreen },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.xl,
  },

  logoWrap: { alignItems: 'center', marginTop: Spacing.md },
  logo: { width: 176, height: 150 },

  card: {
    width: '100%',
    backgroundColor: BQ.darkGreen,
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardTitle: {
    color: BQ.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: BQ.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.85,
  },

  textarea: {
    width: '100%',
    minHeight: 140,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: BQ.grey,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    color: BQ.white,
    fontSize: 14,
    lineHeight: 22,
  },

  button: {
    width: '100%',
    backgroundColor: BQ.orange,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: BQ.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
});