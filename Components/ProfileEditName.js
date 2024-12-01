import React, { useState } from "react";
import { Sheet, Input, Label, XStack, Button, YStack, View } from "tamagui";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../Firebase/firebaseSetup";

const ProfileEditName = ({ isOpen, onClose, onSave }) => {
  const [newName, setNewName] = useState("");

  const handleSave = async () => {
    if (newName.trim()) {
      try {
        const userId = auth.currentUser.uid;
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", userId);

        await updateDoc(userDocRef, {
          displayName: newName,
        });

        onSave(newName);
        onClose();
      } catch (error) {
        console.error("Error updating displayName:", error);
        alert("Failed to update name. Please try again.");
      }
    } else {
      alert("Name cannot be empty");
    }
  };

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[85, 50, 25]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame padding="$2" justifyContent="center" alignItems="center">
        <YStack gap="$2">
          <Label>New Name</Label>
          <Input
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter new name"
          />
        </YStack>

        <View style={{ marginTop: 20 }} />

        <XStack gap="$2" justifyContent="flex-end" marginTop="$4">
          <Button onPress={onClose}>Cancel</Button>
          <Button theme="active" onPress={handleSave}>
            Save
          </Button>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default ProfileEditName;
