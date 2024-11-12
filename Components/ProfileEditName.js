import React, { useState } from "react";
import { Sheet, Fieldset, Input, Label, XStack, Button, YStack, View } from "tamagui";

const ProfileEditName = ({ isOpen, onClose, onSave }) => {
  const [newName, setNewName] = useState("");

  const handleSave = () => {
    if (newName.trim()) {
      onSave(newName);
      onClose();
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
