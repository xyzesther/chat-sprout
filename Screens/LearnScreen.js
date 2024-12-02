import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable, ScrollView, StyleSheet } from "react-native";
import { colors, fontSize } from "../styles/styles";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function LearnScreen({ navigation }) {
  const firestore = getFirestore();

  const conversations = [
    { theme: 0, topic: 0 },
    { theme: 0, topic: 1 },
    { theme: 0, topic: 2 },
    { theme: 1, topic: 0 },
    { theme: 1, topic: 1 },
    { theme: 1, topic: 2 },
    { theme: 2, topic: 0 },
    { theme: 2, topic: 1 },
    { theme: 2, topic: 2 },
  ];

  const [topicNames, setTopicNames] = useState(Array(9).fill(""));
  const [themeNames, setThemeNames] = useState(Array(3).fill(""));

  useEffect(() => {
    async function fetchThemeAndTopicNames() {
      try {
        const themePromises = [0, 1, 2].map(async (themeIndex) => {
          const docRef = doc(firestore, "themes", `${themeIndex}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(`Fetched theme ${themeIndex} data:`, data);

            setThemeNames((prev) => {
              const newThemeNames = [...prev];
              newThemeNames[themeIndex] = data.themeName;
              return newThemeNames;
            });

            const topicsCollectionRef = collection(docRef, "topics");
            const topicsSnapshot = await getDocs(topicsCollectionRef);

            if (!topicsSnapshot.empty) {
              topicsSnapshot.docs.forEach((topicDoc, topicIndex) => {
                const topicData = topicDoc.data();
                console.log(`Fetched topic ${themeIndex}-${topicIndex} data:`, topicData);

                setTopicNames((prev) => {
                  const newTopicNames = [...prev];
                  newTopicNames[themeIndex * 3 + topicIndex] = topicData.topicName;
                  return newTopicNames;
                });
              });
            } else {
              console.log(`No topics found for theme ${themeIndex}`);
            }
          } else {
            console.log(`No such document for theme ${themeIndex}`);
          }
        });

        await Promise.all(themePromises);
      } catch (error) {
        console.error("Error fetching theme and topic names:", error);
      }
    }

    fetchThemeAndTopicNames();
  }, [firestore]);

  const imageWidth = 420;
  const imageHeight = 1100;

  const spots = [
    { id: 0, xPercentStart: 33, yPercentStart: 20, text_position: true },
    { id: 1, xPercentStart: 28, yPercentStart: 28, text_position: true },
    { id: 2, xPercentStart: 35, yPercentStart: 35, text_position: true },
    { id: 3, xPercentStart: 50, yPercentStart: 49, text_position: false },
    { id: 4, xPercentStart: 60, yPercentStart: 55, text_position: false },
    { id: 5, xPercentStart: 65, yPercentStart: 62, text_position: false },
    { id: 6, xPercentStart: 25, yPercentStart: 74, text_position: true },
    { id: 7, xPercentStart: 10, yPercentStart: 80, text_position: true },
    { id: 8, xPercentStart: 7, yPercentStart: 88, text_position: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("./../assets/long.png")}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        >
          <Text style={[styles.theme, { top: "12%", left: "30%" }]}>
            💬 {themeNames[0]}
          </Text>
          <Text style={[styles.theme, { top: "43%", left: "15%" }]}>
            💬 {themeNames[1]}
          </Text>
          <Text style={[styles.theme, { top: "68%", left: "18%" }]}>
            💬 {themeNames[2]}
          </Text>

          {spots.map((spot) => (
            <Pressable
              key={spot.id}
              style={[
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
                  title: topicNames[spot.id],
                  topic: conversations[spot.id],
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
                {topicNames[spot.id]}
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