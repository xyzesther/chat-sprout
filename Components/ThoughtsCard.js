import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { Card } from "tamagui";
import { colors } from "../styles/styles";

const ThoughtsCard = ({ article }) => {
  const cardbgs = [
    require("../assets/cardbg01.png"),
    require("../assets/cardbg02.png"),
    require("../assets/cardbg03.png"),
    require("../assets/cardbg04.png"),
    require("../assets/cardbg05.png"),
    require("../assets/cardbg06.png"),
  ];

  const [backgroundIndexes, setBackgroundIndexes] = useState([]);

  useEffect(() => {
    const indexes = [];
    while (indexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * cardbgs.length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    setBackgroundIndexes(indexes);
  }, [article]);

  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(-5)).current;
  const translateY3 = useRef(new Animated.Value(-10)).current;

  return (
    <View style={styles.cardContainer}>
      <Animated.View
        style={[
          styles.card,
          { transform: [{ translateY: translateY3 }, { rotate: "-3deg" }] },
        ]}
      >
        <ImageBackground
          source={cardbgs[backgroundIndexes[2]]}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          { transform: [{ translateY: translateY2 }, { rotate: "5deg" }] },
        ]}
      >
        <ImageBackground
          source={cardbgs[backgroundIndexes[1]]}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          { transform: [{ translateY: translateY1 }, { rotate: "0deg" }] },
        ]}
      >
        <ImageBackground
          source={cardbgs[backgroundIndexes[0]]}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Card style={styles.contentCard}>
            <View style={styles.contentCardRow}>
              <Text style={styles.cardTitle}>{article.title}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardContent}>{article.content}</Text>
            </View>
          </Card>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 600,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  card: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageStyle: {
    borderRadius: 10,
  },
  contentCard: {
    flex: 1,
    height: "65%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "column",
  },
  contentCardRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: colors.theme,
    width: "100%",
  },
  cardContent: {
    fontSize: 18,
    color: "#333",
    textAlign: "left",
    color: colors.theme,
  },
});

export default ThoughtsCard;
