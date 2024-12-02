import React, { useState } from "react";
import { Alert } from "react-native";
import { Sheet, Input, Label, XStack, Button, YStack, Text } from "tamagui";
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
      snapPoints={[60]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$6"
        borderTopLeftRadius="$4"
        borderTopRightRadius="$4"
        backgroundColor="white"
      >
        <YStack gap="$4">
          <Text fontWeight="bold" fontSize="$4" textAlign="center">
            Update Password
          </Text>

          <YStack gap="$2">
            <YStack>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                secureTextEntry
              />
            </YStack>

            <YStack>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
              />
            </YStack>

            <YStack>
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </YStack>
          </YStack>

          <XStack gap="$4" justifyContent="flex-end" marginTop="$4">
            <Button
              size="$4"
              theme="neutral"
              borderRadius="$4"
              onPress={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                onClose();
              }}
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

export default ProfileEditPassword;
