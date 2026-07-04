import { BQButton } from '@/components/ui/bq-button';
import { BQInput } from '@/components/ui/bq-input';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// TODO: zameniti pravim podacima iz Supabase
const MOCK_USER = {
  username: 'KORISNIK',
  xp: 1255,
  rank: 7,
  totalUsers: 23244,
};

export default function EditProfileScreen() {
  const [username, setUsername]         = useState(MOCK_USER.username);
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [avatarUri, setAvatarUri]       = useState<string | null>(null);
  const [saving, setSaving]             = useState(false);
  const [photoModalVisible, setPhotoModal] = useState(false);

  // ---------- Image picker helpers ----------

  const requestAndPick = async (useCamera: boolean) => {
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Camera access is required to take a photo. Please enable it in Settings.'
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) setAvatarUri(result.assets[0].uri);
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Gallery access is required to pick a photo. Please enable it in Settings.'
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) setAvatarUri(result.assets[0].uri);
    }
    setPhotoModal(false);
  };

  const handleAvatarPress = () => {
    // Na iOS koristimo native ActionSheet, na Androidu custom modal
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) requestAndPick(true);
          if (buttonIndex === 2) requestAndPick(false);
        }
      );
    } else {
      setPhotoModal(true);
    }
  };

  // ---------- Save ----------

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (password && password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    setSaving(true);
    // TODO: Supabase update (username, password, avatar) kad baza bude gotova
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Saved!', 'Your profile has been updated.', [
        { text: 'OK', onPress: () => router.push('/(tabs)/profile') },
      ]);
    }, 800);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} hitSlop={10}>
              <Ionicons name="chevron-back" size={22} color={BQ.white} />
            </TouchableOpacity>
          </View>

          {/* Avatar + info header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.avatarWrap} onPress={handleAvatarPress}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <Ionicons name="person" size={40} color={BQ.grey} />
              )}
              {/* Kamera overlay */}
              <View style={styles.cameraOverlay}>
                <Ionicons name="camera" size={14} color={BQ.white} />
              </View>
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <Text style={styles.username}>{MOCK_USER.username}</Text>
              <Text style={styles.xp}>{MOCK_USER.xp} xp</Text>
              <Text style={styles.rank}>
                rank{' '}
                <Text style={styles.rankHighlight}>#{MOCK_USER.rank}</Text>
                {' '}out of {MOCK_USER.totalUsers}
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formWrap}>
            <Text style={styles.sectionTitle}>EDIT PROFILE</Text>

            <BQInput
              label="Username"
              icon="person-outline"
              placeholder="Enter new username"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.divider}>CHANGE PASSWORD</Text>

            <BQInput
              label="New Password"
              icon="lock-closed-outline"
              placeholder="Enter new password"
              isPassword
              value={password}
              onChangeText={setPassword}
            />

            <BQInput
              label="Confirm Password"
              icon="lock-closed-outline"
              placeholder="Confirm new password"
              isPassword
              value={confirmPassword}
              onChangeText={setConfirm}
            />

            <BQButton
              title="Save Changes"
              onPress={handleSave}
              loading={saving}
              style={styles.saveBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Android photo picker modal */}
      <Modal
        visible={photoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPhotoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Change Profile Photo</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => requestAndPick(true)}
            >
              <Ionicons name="camera-outline" size={22} color={BQ.white} />
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => requestAndPick(false)}
            >
              <Ionicons name="image-outline" size={22} color={BQ.white} />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, styles.modalCancel]}
              onPress={() => setPhotoModal(false)}
            >
              <Text style={[styles.modalOptionText, { color: BQ.grey }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BQ.black },

  container: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },

  topBar: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: BQ.black,
  },

  // Header (isti pattern kao friends)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: BQ.black,
    gap: Spacing.md,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    backgroundColor: BQ.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  avatarImg: { width: 72, height: 72, borderRadius: Radius.pill },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 27,
    height: 27,
    borderRadius: Radius.pill,
    backgroundColor: BQ.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: { gap: 2 },
  username: {
    color: BQ.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  xp: { color: BQ.grey, fontSize: 14 },
  rank: { color: BQ.grey, fontSize: 13 },
  rankHighlight: { color: BQ.green, fontWeight: '700' },

  // Form
  formWrap: {
    flex: 1,
    backgroundColor: BQ.darkGreen,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    color: BQ.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  divider: {
    color: BQ.whiteMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  saveBtn: { marginTop: Spacing.sm },

  // Android modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: BQ.black,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  modalTitle: {
    color: BQ.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  modalOptionText: { color: BQ.white, fontSize: 16 },
  modalCancel: { borderBottomWidth: 0, justifyContent: 'center' },
});