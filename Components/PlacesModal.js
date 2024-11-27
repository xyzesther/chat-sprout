import React from "react";
import { StyleSheet, View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { spacing, fontSize, borderRadius, colors } from "../styles/styles";

export default function PlacesModal({ visible, places, onClose, onPlaceSelect }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nearby Places</Text>
          <FlatList
            data={places}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.placeItem}
                onPress={() => onPlaceSelect(item)}
              >
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeDetails}>{item.vicinity}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noPlacesText}>No places found nearby.</Text>
            }
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.background.modal,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.lg,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: fontSize.header,
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: colors.theme,
  },
  placeItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  placeName: {
    fontSize: fontSize.body,
    fontWeight: "bold",
  },
  placeDetails: {
    fontSize: fontSize.tab,
    color: colors.text.black,
  },
  noPlacesText: {
    textAlign: "center",
    marginVertical: spacing.lg,
    fontSize: fontSize.body,
    color: colors.text.black,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.theme,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
