import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, Alert } from "react-native";
import { Switch, YStack, XStack, Button } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { fontSize } from "../styles/styles";
import { colors } from "../styles/styles";

export default function NotificationSetting() {
  const [isReminderOn, setReminderOn] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);
  const [tempTime, setTempTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Verify notification permission
  async function verifyPermission() {
    try {
      const permissionResponse = await Notifications.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }
      const requestPermissionResponse =
        await Notifications.requestPermissionsAsync();
      return requestPermissionResponse.granted;
    } catch (error) {
      console.log("Error getting notification permission: ", error);
      return false;
    }
  }

  // Schedule notification
  async function scheduleNotificationHandler(time) {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give notification permission.");
        return;
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Practice!",
          body: "Don't forget to practice your skills today.",
        },
        trigger: {
          hour: time.getHours(),
          minute: time.getMinutes(),
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
        },
      });

      console.log("Notification scheduled with ID:", notificationId);

      Toast.show({
        type: "success",
        text1: "Reminder Set",
        text2: `Reminder scheduled for ${time.toLocaleTimeString()}.`,
        position: "top",
        topOffset: 120,
      });
    } catch (error) {
      console.log("Error scheduling notification:", error);
    }
  }

  // Handle the toggle switch
  function handleSwitchChange(value) {
    setReminderOn(value);
    if (!value) {
      setReminderTime(null);
      Toast.show({
        type: "info",
        text1: "Reminder Disabled",
        position: "top",
        topOffset: 120,
      });
    }
  }

  // Handle the time picker
  function handleTimeChange(event, selectedTime) {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    if (selectedTime) {
      setTempTime(selectedTime);
    }
  }

  function confirmTimeSelection() {
    setReminderTime(tempTime); // Update the reminder time
    setShowTimePicker(false);
    scheduleNotificationHandler(tempTime);
  }

  return (
    <YStack padding="$4">
      <Text style={styles.title}>Notification</Text>

      {/* Toggle switch */}
      <XStack justifyContent="space-between" alignItems="center">
        <Text>Enable Daily Reminder</Text>
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

      {/* Reminder time button */}
      {isReminderOn && (
        <YStack marginTop="$2">
          <Button onPress={() => setShowTimePicker(true)}>
            Reminder Time: {reminderTime ? reminderTime.toLocaleTimeString() : "Not Set"}
          </Button>
          {showTimePicker && (
            <>
              <DateTimePicker
                value={tempTime}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
              />
              <XStack justifyContent="space-around" marginTop="$4">
                <Button onPress={() => setShowTimePicker(false)}>Cancel</Button>
                <Button onPress={confirmTimeSelection}>Confirm</Button>
              </XStack>
            </>
          )}
        </YStack>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
});
