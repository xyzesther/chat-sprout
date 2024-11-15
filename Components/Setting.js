import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Switch, YStack, XStack, Button } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fontSize } from "../styles/styles";
import { colors } from "../styles/styles";

const Setting = () => {
  const [isReminderOn, setReminderOn] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSwitchChange = (value) => {
    setReminderOn(value);
    if (!value) {
      setShowTimePicker(false);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }

    if (selectedTime) {
      setReminderTime(selectedTime);
      if (Platform.OS === "android") {
        setShowTimePicker(false);
      }
    }
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  return (
    <YStack padding="$4">
      <Text style={styles.title}>Setting</Text>

      <XStack justifyContent="space-between" alignItems="center">
        <Text>Daily Reminder</Text>

        <Switch
          size="$2"
          checked={isReminderOn}
          onCheckedChange={handleSwitchChange}
          borderColor={colors.theme}
          backgroundColor={colors.lightTheme}
        >
          <Switch.Thumb
            animation="bouncy"
            backgroundColor={isReminderOn ? colors.theme : colors.disabled}
          />
        </Switch>
      </XStack>

      {isReminderOn && (
        <YStack marginTop="$2">
          <Button onPress={toggleTimePicker}>
            Reminder Time: {reminderTime.toLocaleTimeString()}
          </Button>
          {showTimePicker && (
            <DateTimePicker
              value={reminderTime || new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}
        </YStack>
      )}
    </YStack>
  );
};

export default Setting;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
});
