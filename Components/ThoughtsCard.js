import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "tamagui";

export default function ThoughtsCard({ children }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {children}
        <Text>card blue</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: "90%",
    backgroundColor: "#ADD8E6", // 浅蓝色背景
  },
});
