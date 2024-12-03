import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import ThoughtsCard from "../Components/ThoughtsCard";

const { width } = Dimensions.get("window");

const articles = [
  {
    title: "Real Over Perfect",
    content:
      "You don’t need to be perfect in every conversation — your small mistakes or awkward moments often go unnoticed by others. Even if someone notices, they’re rarely as important as you think. These little flaws are what make you human, and they often make you more approachable and relatable. Be yourself and embrace what makes you unique—being real has a much stronger impact than trying to be perfect.",
  },
  {
    title: "Permission to Pause",
    content:
      "Everyone has good days and bad days, and it’s normal to not feel like being social sometimes. Life can be busy and stressful, and there’s no rule that says you always have to talk to others. Give yourself time to rest and recharge — it’s a simple way to take care of yourself. When you’re ready, you’ll feel more positive and ready to connect. Quality over quantity matters in relationships, and your well-being should always come first.",
  },
  {
    title: "A Smile Goes a Long Way",
    content:
      "Short chats can totally make someone’s day! A smile, a quick “hi,” or a kind word can leave a bigger impression than you think. You don’t always need a deep, soul-searching conversation to connect — sometimes the little things say it all. Keep it light, keep it warm, and remember: it’s not about how long you talk, but how genuine you are.",
  },
  {
    title: "It’s a Unique Journey",
    content:
      "Socializing is a skill you build over time — every conversation is a step forward. Each interaction is a chance to learn something new, whether it’s about the other person or even yourself. So, don’t stress about the outcome—just enjoy the process. The more you practice, the more natural it’ll feel, and hey, you’re already doing great!",
  },
  {
    title: "Curiosity Leads the Way",
    content:
      "Curiosity about others’ thoughts and experiences opens the door to meaningful connections. Everyone carries a unique story, offering something new to discover and learn. Each interaction is a small adventure, filled with opportunities to grow and connect. That’s what makes them so rewarding!",
  },
];

const ThoughtsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    const { translationX } = event.nativeEvent;
    let newIndex = currentIndex;
    if (translationX < -width / 4 && currentIndex < articles.length - 1) {
      newIndex = currentIndex + 1;
    } else if (translationX > width / 4 && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex === currentIndex) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: translationX < 0 ? -width : width,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(newIndex);
        translateX.setValue(translationX < 0 ? width : -width);
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View
          style={[styles.cardContainer, { transform: [{ translateX }] }]}
        >
          <ThoughtsCard article={articles[currentIndex]} />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.indicatorContainer}>
        {articles.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { opacity: currentIndex === index ? 1 : 0.5 },
            ]}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: width,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#333",
    margin: 5,
  },
});

export default ThoughtsScreen;
