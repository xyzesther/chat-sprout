import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../Components/Profile";
import Setting from "../Components/Setting";
import { colors } from "../styles/styles";

export default function AccountScreen({ setIsUserLoggedIn }) {
  return (
    <View style={styles.container}>
      <Profile setIsUserLoggedIn={setIsUserLoggedIn}/>
      <Setting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
});
