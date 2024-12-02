import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const StackCards = () => {
  // 创建一些动画值
  const translateY1 = new Animated.Value(0);
  const translateY2 = new Animated.Value(-20);
  const translateY3 = new Animated.Value(-30);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>卡片叠加示例</Text>
      <View style={styles.cardContainer}>
        {/* 卡片 3 */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY3 }, { rotate: "-3deg" }] },
          ]}
        >
          <Text style={styles.cardContent}>卡片 3 的内容</Text>
        </Animated.View>
        {/* 卡片 2 */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY2 }, { rotate: "5deg" }] },
          ]}
        >
          <Text style={styles.cardContent}>卡片 2 的内容</Text>
        </Animated.View>
        {/* 卡片 1 */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY1 }, { rotate: "0deg" }] },
          ]}
        >
          <Text style={styles.cardContent}>卡片 1 的内容</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    width: "80%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // 让卡片叠在一起
  },
  card: {
    position: "absolute", // 让每张卡片叠在一起
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android 上的阴影
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    fontSize: 16,
    color: "#333",
  },
});

export default StackCards;