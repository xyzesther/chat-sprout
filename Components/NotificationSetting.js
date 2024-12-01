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
  const [reminderTime, setReminderTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isTimeChanged, setIsTimeChanged] = useState(false);

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
  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give notification permission.");
        return;
      }

      const triggerTime = new Date(reminderTime);

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Practice!",
          body: "Don't forget to practice your skills today.",
        },
        trigger: {
          hour: triggerTime.getHours(),
          minute: triggerTime.getMinutes(),
          repeats: true,
        },
      });

      console.log("Notification scheduled with ID:", notificationId);

      const toastMessage = isTimeChanged
        ? {
            type: "success",
            text1: "Reminder Time Changed",
            text2: `New time set for ${triggerTime.toLocaleTimeString()}`,
          }
        : {
            type: "success",
            text1: "Reminder Set",
            text2: `Reminder set for ${triggerTime.toLocaleTimeString()}`,
          };

      Toast.show({
        ...toastMessage,
        position: "top",
        topOffset: 120,
      });

      setIsTimeChanged(false);
    } catch (error) {
      console.log("Error scheduling notification:", error);
    }
  }

  // Handle the toggle switch
  async function handleSwitchChange(value) {
    setReminderOn(value);
    if (value) {
      // Set default reminder time and schedule notification
      setReminderTime(new Date());
      setTempTime(new Date());
      setIsTimeChanged(false);
      await scheduleNotificationHandler();
    } else {
      setShowTimePicker(false);
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
      setIsTimeChanged(true);
    }
  }

  function confirmTimeSelection() {
    setReminderTime(tempTime);
    setShowTimePicker(false);
    if (isReminderOn) {
      scheduleNotificationHandler();
    }
  }

  function toggleTimePicker() {
    setShowTimePicker(!showTimePicker);
  }

  return (
    <YStack padding="$4">
      <Text style={styles.title}>Notification</Text>

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

      {isReminderOn && (
        <YStack marginTop="$2">
          <Button onPress={toggleTimePicker}>
            Reminder Time: {reminderTime.toLocaleTimeString()}
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
