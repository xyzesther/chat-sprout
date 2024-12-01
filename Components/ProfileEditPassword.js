import React, { useState } from "react";
import { Alert } from "react-native";
import { Sheet, Input, Label, XStack, Button, YStack, View } from "tamagui";
import { auth } from "../Firebase/firebaseSetup";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

const ProfileEditPassword = ({ isOpen, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSave = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        // Reauthenticate the user
        await reauthenticateWithCredential(user, credential);

        // Update the password
        await updatePassword(user, newPassword);

        onSave(newPassword);
        onClose();
        Alert.alert("Success", "Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
        Alert.alert("Error", error.message || "Failed to update password. Please try again.");
      }
    } else {
      Alert.alert("Error", "New passwords do not match");
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
          <Label>Current Password</Label>
          <Input
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            secureTextEntry
          />
          <Label>New Password</Label>
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry
          />
          <Label>Confirm New Password</Label>
          <Input
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Confirm new password"
            secureTextEntry
          />
        </YStack>

        <View style={{ marginTop: 20 }} />

        <XStack gap="$2" justifyContent="flex-end">
          <Button onPress={onClose}>Cancel</Button>
          <Button theme="active" onPress={handleSave}>
            Save
          </Button>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default ProfileEditPassword;