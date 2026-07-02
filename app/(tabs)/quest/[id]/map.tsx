import { QuestTabHeader } from '@/components/ui/quest-tab-header';
import { getQuestById } from '@/constants/mock-quests';
import { BQ, Radius, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type Coords = { latitude: number; longitude: number };

export default function QuestMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = getQuestById(id);

  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Dozvoli pristup lokaciji da bi video svoju poziciju na mapi.');
        return;
      }

      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setUserLocation({ latitude: current.coords.latitude, longitude: current.coords.longitude });

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
        (update) => {
          setUserLocation({ latitude: update.coords.latitude, longitude: update.coords.longitude });
        }
      );
    })();

    return () => subscription?.remove();
  }, []);

  const centerOnUser = () => {
    if (!userLocation) return;
    mapRef.current?.animateToRegion(
      { latitude: userLocation.latitude, longitude: userLocation.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      500
    );
  };

  if (!quest) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Quest nije pronađen</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <QuestTabHeader questId={quest.id} title={quest.title} />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{ latitude: quest.location.latitude, longitude: quest.location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={false}
        followsUserLocation={false}
      >
        <Marker
          coordinate={{ latitude: quest.location.latitude, longitude: quest.location.longitude }}
          title={quest.title}
          description={quest.location.address}
          pinColor={BQ.orange}
        />
      </MapView>

      {!!userLocation && (
        <TouchableOpacity style={styles.locateButton} onPress={centerOnUser} activeOpacity={0.8}>
          <Ionicons name="locate" size={22} color={BQ.white} />
        </TouchableOpacity>
      )}

      {errorMsg && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BQ.darkGreen },
  map: { flex: 1 },
  locateButton: {
    position: 'absolute', bottom: Spacing.lg, right: Spacing.lg, backgroundColor: BQ.black,
    width: 46, height: 46, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  warningBanner: { position: 'absolute', bottom: Spacing.lg, left: Spacing.lg, right: Spacing.lg, backgroundColor: BQ.black, padding: Spacing.sm, borderRadius: 8 },
  warningText: { color: BQ.grey, fontSize: 12, textAlign: 'center' },
  notFound: { flex: 1, backgroundColor: BQ.darkGreen, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: BQ.white },
});