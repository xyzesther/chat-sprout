import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontSize } from "../styles/styles";

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
});
