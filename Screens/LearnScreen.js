import conversationData from "../data/conversations.json";
import React, { useState } from "react";
import { colors, fontSize } from "../styles/styles";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function LearnScreen({ navigation }) {
  const topics = [
    conversationData[0].topics[0],
    conversationData[0].topics[1],
    conversationData[0].topics[2],
    conversationData[1].topics[0],
    conversationData[1].topics[1],
    conversationData[1].topics[2],
    conversationData[2].topics[0],
    conversationData[2].topics[1],
    conversationData[2].topics[2],
  ];

  const imageWidth = 420;
  const imageHeight = 1100;

  const spots = [
    {
      id: 0,
      name: topics[0].topic_name,
      xPercentStart: 33,
      yPercentStart: 20,
      text_position: true,
    },
    {
      id: 1,
      name: topics[1].topic_name,
      xPercentStart: 28,
      yPercentStart: 28,
      text_position: true,
    },
    {
      id: 2,
      name: topics[2].topic_name,
      xPercentStart: 35,
      yPercentStart: 35,
      text_position: true,
    },
    {
      id: 3,
      name: topics[3].topic_name,
      xPercentStart: 50,
      yPercentStart: 49,
      text_position: false,
    },
    {
      id: 4,
      name: topics[4].topic_name,
      xPercentStart: 60,
      yPercentStart: 55,
      text_position: false,
    },
    {
      id: 5,
      name: topics[5].topic_name,
      xPercentStart: 65,
      yPercentStart: 62,
      text_position: false,
    },
    {
      id: 6,
      name: topics[6].topic_name,
      xPercentStart: 25,
      yPercentStart: 74,
      text_position: true,
    },
    {
      id: 7,
      name: topics[7].topic_name,
      xPercentStart: 10,
      yPercentStart: 80,
      text_position: true,
    },
    {
      id: 8,
      name: topics[8].topic_name,
      xPercentStart: 7,
      yPercentStart: 88,
      text_position: true,
    },
  ];

  console.log("Topics:", topics);
  console.log("Spots:", spots);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("./../assets/long.png")}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        >
          <Text style={[styles.theme, { top: "12%", left: "30%" }]}>
            💬 {conversationData[0].theme_name}
          </Text>
          <Text style={[styles.theme, { top: "43%", left: "15%" }]}>
            💬 {conversationData[1].theme_name}
          </Text>
          <Text style={[styles.theme, { top: "68%", left: "18%" }]}>
            💬 {conversationData[2].theme_name}
          </Text>

          {spots.map((spot) => (
            <Pressable
              key={spot.id}
              style={() => [
                styles.spot,
                {
                  left: `${spot.xPercentStart}%`,
                  top: `${spot.yPercentStart}%`,
                  backgroundColor: "#C6C6E6",
                  shadowOpacity: 0.2,
                },
              ]}
              onPress={() => {
                console.log("Pressed spot:", spot);
                navigation.navigate("ConversationScreen", {
                  title: topics[spot.id].topic_name,
                  topic: topics[spot.id],
                });
              }}
              android_ripple={{ color: "rgba(0, 0, 255, 0.3)", radius: 50 }}
            >
              <Text
                style={[
                  styles.topicName,
                  spot.text_position
                    ? styles.topicNameRight
                    : styles.topicNameLeft,
                ]}
              >
                {spot.name}
              </Text>
            </Pressable>
          ))}
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: "center" },
  image: { resizeMode: "contain" },
  spot: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 6,
  },
  topicName: {
    position: "absolute",
    fontSize: fontSize.body,
    color: "#000",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 4,
    textAlign: "center",
    width: 200,
  },
  topicNameRight: {
    left: 45,
  },
  topicNameLeft: {
    right: 45,
  },
  theme: {
    position: "absolute",
    left: "50%",
    fontSize: fontSize.header,
    fontWeight: "bold",
    color: "gray",
    padding: 10,
    textAlign: "center",
    width: 260,
  },
});
