import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#523735' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#fdfcf8' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b8d0e1' }],
  },
];

export default function App() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState('standard');
  const mapRef = useRef(null);

  const fetchLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied. Please enable location access in your device settings.');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const { latitude, longitude } = currentLocation.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(currentLocation.coords);
      setRegion(newRegion);
      setErrorMsg(null);
      mapRef.current?.animateToRegion(newRegion, 800);
    } catch (error) {
      setErrorMsg('Unable to get the current location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleMapTypeChange = type => {
    setMapType(type);
  };

  const handleCenterMap = () => {
    if (location) {
      const nextRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(nextRegion);
      mapRef.current?.animateToRegion(nextRegion, 800);
    }
  };

  const handleRegionChangeComplete = nextRegion => {
    setRegion(nextRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? null : undefined}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        showsMyLocationButton={false}
        followsUserLocation
        showsCompass
        zoomControlEnabled
        customMapStyle={mapStyles}
        mapType={mapType}
      >
        {location ? (
          <>
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="You are here"
              description="Live location"
            />
            <Circle
              center={{ latitude: location.latitude, longitude: location.longitude }}
              radius={Math.max(location.accuracy, 60)}
              strokeColor="rgba(37, 99, 235, 0.3)"
              fillColor="rgba(37, 99, 235, 0.12)"
            />
          </>
        ) : null}
      </MapView>

      <View style={styles.headerCard}>
        <View>
          <Text style={styles.mainTitle}>Location Explorer</Text>
          <Text style={styles.subtitle}>Live GPS tracking with map layers and precision indicator.</Text>
        </View>

        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{location ? 'Live' : 'Waiting'}</Text>
        </View>
      </View>

      <View style={styles.controlCard}>
        <View style={styles.row}>
          {['standard', 'satellite', 'hybrid'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.modeButton,
                mapType === type ? styles.modeButtonActive : styles.modeButtonInactive,
              ]}
              onPress={() => handleMapTypeChange(type)}
            >
              <Text style={[styles.modeText, mapType === type && styles.modeTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCenterMap}>
            <Text style={styles.actionText}>Center Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={fetchLocation} disabled={loading}>
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.actionText}>Refresh</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Latitude</Text>
            <Text style={styles.statValue}>{location ? location.latitude.toFixed(6) : 'Waiting'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Longitude</Text>
            <Text style={styles.statValue}>{location ? location.longitude.toFixed(6) : 'Waiting'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Accuracy</Text>
            <Text style={styles.statValue}>{location ? `${location.accuracy.toFixed(0)}m` : 'Waiting'}</Text>
          </View>
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  map: {
    flex: 1,
  },
  headerCard: {
    position: 'absolute',
    top: 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  subtitle: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 13,
    maxWidth: width * 0.65,
  },
  statusTag: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  controlCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 22,
    elevation: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  modeButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#2563eb',
  },
  modeButtonInactive: {
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
  },
  modeText: {
    color: '#cbd5e1',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  modeTextActive: {
    color: '#ffffff',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statBox: {
    width: '32%',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 12,
    color: '#fb7185',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
