import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function ExploreScreen() {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();

  // Verify Location Permission
  async function verifyPermission() {
    try {
      if (permissionResponse?.granted) {
        return true;
      }
      const response = await requestPermission();
      return response.granted;
    } catch (err) {
      console.error("Permission verification error:", err);
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
        } catch (err) {
          console.error("Error fetching location:", err);
          Alert.alert("Error", "Unable to fetch your current location.");
        }
      }
    }
    fetchLocation();
  }, []);

  // Update Location Marker on Map Press
  function handleMapPress(event) {
    const newLocation = event.nativeEvent.coordinate;
    setLocation(newLocation);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled
          zoomControlEnabled
          onPress={handleMapPress}
        >
          <Marker coordinate={location} title="Current Location" />
        </MapView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
