import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export const MapScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedTruck, setSelectedTruck] = useState<any>(null);

  // Zamboanga City coordinates
  const initialRegion = {
    latitude: 6.9214,
    longitude: 122.0790,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  // Simulated fire truck locations in Zamboanga
  const fireTrucks = [
    {
      id: '1',
      name: 'BFP Truck 1 - Central Station',
      latitude: 6.9214,
      longitude: 122.0790,
      status: 'Available',
      crew: 4,
      equipment: 'Fire Truck, Water Tank',
      lastUpdate: '2 mins ago',
    },
    {
      id: '2',
      name: 'BFP Truck 2 - East District',
      latitude: 6.9314,
      longitude: 122.0890,
      status: 'On Duty',
      crew: 3,
      equipment: 'Fire Truck, Rescue Tools',
      lastUpdate: '5 mins ago',
    },
    {
      id: '3',
      name: 'BFP Truck 3 - West District',
      latitude: 6.9114,
      longitude: 122.0690,
      status: 'Responding',
      crew: 5,
      equipment: 'Fire Truck, Medical Kit',
      lastUpdate: '1 min ago',
    },
    {
      id: '4',
      name: 'BFP Truck 4 - North District',
      latitude: 6.9414,
      longitude: 122.0990,
      status: 'Available',
      crew: 4,
      equipment: 'Fire Truck, Ladder',
      lastUpdate: '3 mins ago',
    },
  ];

  const getTruckColor = (status: string) => {
    switch (status) {
      case 'Available': return '#4CAF50';
      case 'On Duty': return '#FF9800';
      case 'Responding': return '#E53935';
      default: return '#757575';
    }
  };

  const handleTruckPress = (truck: any) => {
    setSelectedTruck(truck);
  };

  const closeTruckDetails = () => {
    setSelectedTruck(null);
  };

  const handleCallStation = () => {
    console.log('Call station for', selectedTruck?.name);
  };

  const handleGetDirections = () => {
    console.log('Get directions to', selectedTruck?.name);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 40 }]} edges={['top', 'bottom']}>
      {/* Header */}
      <LinearGradient
        colors={['#8B0000', '#B22222', '#DC143C']}
        style={styles.header}
      >
        <View style={styles.texturePattern}>
          {Array.from({ length: 60 }, (_, i) => (
            <View
              key={i}
              style={[
                styles.textureLine,
                {
                  transform: [{ rotate: '45deg' }],
                  top: Math.floor(i / 8) * 30,
                  left: (i % 8) * 60,
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fire Truck Tracking</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {/* Map Tiles */}
        <UrlTile
          urlTemplate="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=qPx9g6hwaJAB3La6VCyl"
          maximumZ={19}
          flipY={false}
        />

        {/* Fire Truck Markers */}
        {fireTrucks.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: truck.latitude,
              longitude: truck.longitude,
            }}
          >
            <TouchableOpacity
              style={[styles.truckMarker, { backgroundColor: getTruckColor(truck.status) }]}
              onPress={() => handleTruckPress(truck)}
              activeOpacity={0.8}
            >
              <Ionicons name="car" size={20} color="#fff" />
              <View style={styles.truckDot} />
            </TouchableOpacity>
          </Marker>
        ))}

        {/* BFP Stations */}
        <Marker
          coordinate={{
            latitude: 6.9214,
            longitude: 122.0790,
          }}
        >
          <View style={styles.stationMarker}>
            <Ionicons name="home" size={16} color="#E53935" />
          </View>
        </Marker>
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Fire Truck Status</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.legendText}>On Duty</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#E53935' }]} />
            <Text style={styles.legendText}>Responding</Text>
          </View>
        </View>
      </View>

      {/* Info Panel */}
      <TouchableOpacity 
        style={styles.infoPanel}
        onPress={() => navigation.navigate('FireTruckTracking')}
        activeOpacity={0.8}
      >
        <Text style={styles.infoTitle}>Zamboanga City Fire District</Text>
        <Text style={styles.infoText}>4 Active Fire Trucks • 1 Central Station</Text>
        <Text style={styles.infoSubtext}>Last updated: Just now</Text>
      </TouchableOpacity>

      {/* Truck Details Panel */}
      {selectedTruck && (
        <View style={styles.truckDetailsPanel}>
          <View style={styles.truckDetailsHeader}>
            <Text style={styles.truckDetailsTitle}>{selectedTruck.name}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={closeTruckDetails}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.truckDetailsContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <View style={[styles.statusBadge, { backgroundColor: getTruckColor(selectedTruck.status) }]}>
                <Text style={styles.statusText}>{selectedTruck.status}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Crew:</Text>
              <Text style={styles.detailValue}>{selectedTruck.crew} members</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Equipment:</Text>
              <Text style={styles.detailValue}>{selectedTruck.equipment}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Update:</Text>
              <Text style={styles.detailValue}>{selectedTruck.lastUpdate}</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleCallStation}
            >
              <Ionicons name="call" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Call Station</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.directionsButton]}
              onPress={handleGetDirections}
            >
              <Ionicons name="navigate" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 60,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  headerOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  texturePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textureLine: {
    position: 'absolute',
    width: 40,
    height: 2,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  truckMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  truckDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  stationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  legend: {
    position: 'absolute',
    top: 100,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  legendItems: {
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoSubtext: {
    fontSize: 10,
    color: '#999',
  },
  truckDetailsPanel: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 300,
  },
  truckDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  truckDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckDetailsContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#860d0dff',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  directionsButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
