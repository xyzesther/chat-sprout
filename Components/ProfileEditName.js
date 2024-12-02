import React, { useState } from "react";
import { Sheet, Input, XStack, Button, YStack, Text, Label } from "tamagui";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../Firebase/firebaseSetup";
import { fontSize, spacing, colors, borderRadius } from "../styles/styles";

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
      snapPoints={[40]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame
        paddingHorizontal="$4"
        paddingVertical="$6"
        backgroundColor={colors.background.white}
        borderTopLeftRadius={borderRadius.lg}
        borderTopRightRadius={borderRadius.lg}
      >
        <YStack gap="$4">
          <Text fontWeight="bold" fontSize="$4" textAlign="center">
            Edit Your Name
          </Text>

          <YStack gap="$2">
            <Label htmlFor="confirm-new-password">New Name</Label>
            <Input
              id="new-name"
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your new name"
            />
          </YStack>

          <XStack gap="$4" justifyContent="flex-end" marginTop="$4">
            <Button
              size="$4"
              theme="neutral"
              borderRadius="$4"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              size="$4"
              theme="active"
              borderRadius="$4"
              onPress={handleSave}
            >
              Save
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default ProfileEditName;
