import { BQButton } from '@/components/ui/bq-button';
import { QuestTabHeader } from '@/components/ui/quest-tab-header';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useQuest } from '@/hooks/use-quests';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuestSubmitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { quest, loading: questLoading, error: questError } = useQuest(id);
  const { session } = useAuth();  

  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    const result = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
    if (result?.uri) setPhotoUri(result.uri);
  };

  const retake = () => setPhotoUri(null);

  const handleSubmit = async() => {
    if (!photoUri || !quest || !session?.user?.id) return;

    setSubmitting(true);
    try {
      // 1. Ucitaj sliku sa lokalnog fajla u memoriju
      const response = await fetch(photoUri);
      const arrayBuffer = await response.arrayBuffer();

      // 2. Otpremi u Supabase Storage, svaki korisnik u svoj podfolder
      const filePath = `${session.user.id}/${quest.id}-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('quest-photos')
        .upload(filePath, arrayBuffer, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      // 3. Uzmi javni URL otpremljene slike
      const { data: publicUrlData } = supabase.storage.from('quest-photos').getPublicUrl(filePath);

      // 4. Upisi submission red u bazu
      const { error: insertError } = await supabase.from('quest_submissions').insert({
        quest_id: quest.id,
        user_id: session.user.id,
        photo_url: publicUrlData.publicUrl,
      });

      if (insertError) throw insertError;

      Alert.alert('Poslato!', 'Slika je poslata na proveru.', [
        { text: 'OK', onPress: () => router.push(`/quest/${quest.id}`) },
      ]);
    } catch (err: any) {
      Alert.alert('Greška', err.message ?? 'Nešto nije u redu, pokušaj ponovo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (questLoading) {
    return (
      <View style={styles.notFound}>
        <ActivityIndicator color={BQ.green} />
      </View>
    );
  }

    if (questError || !quest) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>{questError ?? 'Quest nije pronađen'}</Text>
      </View>
    );
  }

  if (!permission) {
    return <View style={styles.screen} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.screen}>
        <QuestTabHeader questId={quest.id} title={quest.title} />
        <View style={styles.permissionWrap}>
          <Ionicons name="camera-outline" size={40} color={BQ.grey} />
          <Text style={styles.permissionText}>Potrebna je dozvola za kameru da bi predao dokaz za quest.</Text>
          <BQButton title="Odobri pristup" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <QuestTabHeader questId={quest.id} title={quest.title} />

      <View style={styles.cameraWrap}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ) : (
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing="back" />
        )}

        {!photoUri && (
          <View style={styles.captureRow}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture} activeOpacity={0.8}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {photoUri && (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.retakeButton} onPress={retake} activeOpacity={0.7}>
            <Ionicons name="camera-reverse-outline" size={22} color={BQ.white} />
          </TouchableOpacity>
          <BQButton title="Submit" onPress={handleSubmit} loading={submitting} style={styles.submitButton} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BQ.darkGreen },
  cameraWrap: { flex: 1, backgroundColor: BQ.black },
  captureRow: { position: 'absolute', bottom: Spacing.xl, left: 0, right: 0, alignItems: 'center' },
  captureButton: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: BQ.white },
  captureInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: BQ.white },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.lg },
  retakeButton: { width: 52, height: 52, borderRadius: Radius.sm, backgroundColor: BQ.black, alignItems: 'center', justifyContent: 'center' },
  submitButton: { flex: 1 },
  permissionWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  permissionText: { color: BQ.grey, fontSize: 14, textAlign: 'center' },
  notFound: { flex: 1, backgroundColor: BQ.darkGreen, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: BQ.white },
});