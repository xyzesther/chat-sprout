import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Map from "../Components/Map";
import PlacesModal from "../Components/PlacesModal";

export default function ExploreScreen() {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  const [places, setPlaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Verify Location Permission
  async function verifyPermission() {
    try {
      if (permissionResponse?.granted) {
        return true;
      }
      const response = await requestPermission();
      return response.granted;
    } catch (error) {
      console.error("Permission verification error:", error);
      Alert.alert("Permission Error", "Unable to access location. Please try again.");
      return false;
    }
  }

  // Fetch User's Current Location
  useEffect(() => {
    async function fetchLocation() {
      const hasPermission = await verifyPermission();
      if (hasPermission) {
        try {
          const locationResponse = await Location.getCurrentPositionAsync();
          const userLocation = {
            latitude: locationResponse.coords.latitude,
            longitude: locationResponse.coords.longitude,
          };
          setLocation(userLocation);
          fetchNearbyPlaces(userLocation.latitude, userLocation.longitude);
        } catch (error) {
          console.error("Error fetching location:", error);
          Alert.alert("Error", "Unable to fetch your current location.");
        }
      }
    }
    fetchLocation();
  }, []);

  // Fetch Nearby Places
  async function fetchNearbyPlaces(latitude, longitude) {
    const radius = 10000;
    const type = "school";
    const keyword = "English";

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${latitude},${longitude}`,
            radius: radius,
            type: type,
            keyword: keyword,
            key: process.env.EXPO_PUBLIC_mapsApiKey,
          },
        }
      );
  
      if (response.data.status === "OK") {
        if (response.data.results.length > 0) {
          setPlaces(response.data.results);
          setModalVisible(true);
        } else {
          Alert.alert("No Places Found", "No nearby language learning places found.");
        } 
      } else if (response.data.status === "ZERO_RESULTS") {
        Alert.alert("No Places Found", "No nearby language learning places found.");
      } else {
        console.error("Google Places API Error:", response.data.status);
        Alert.alert("No Places Found", "Unable to fetch places. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      Alert.alert("Network Error", "Unable to fetch places. Please check your connection.");
    }
  }

  // Update Location Marker and Fetch Places
  function handleMapPress(event) {
    const newLocation = event.nativeEvent.coordinate;
    setLocation(newLocation);
    fetchNearbyPlaces(newLocation.latitude, newLocation.longitude);
  }

  function handlePlaceSelect(place) {
    setModalVisible(false);
    Alert.alert("Place Selected", place.name);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <Map location={location} onMapPress={handleMapPress} />
          <PlacesModal
            visible={modalVisible}
            places={places}
            onClose={() => setModalVisible(false)}
            onPlaceSelect={handlePlaceSelect}
          />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading your location...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
