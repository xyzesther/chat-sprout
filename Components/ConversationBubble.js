import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function ExploreScreen() {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    let subscription;

    const startWatching = async () => {
      const hasPermission = await verifyPermission();
      if (hasPermission) {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (locationResponse) => {
            console.log("Location response:", locationResponse);
            setLocation({
              latitude: locationResponse.coords.latitude,
              longitude: locationResponse.coords.longitude,
            });
          }
        );
      }
    };

    startWatching();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  async function verifyPermission() {
    try {
      if (permissionResponse && permissionResponse.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
      return false;
    }
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
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
          <Marker coordinate={location} />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
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
    width: "80%",
    height: "50%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
