import React from "react";
import { View, Text, StyleSheet, Animated, ImageBackground } from "react-native";
import { Card } from "tamagui";

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
          <ImageBackground
            source={require("./../assets/cardbg03.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.cardContent}>卡片 3 的内容</Text>
          </ImageBackground>
        </Animated.View>
        {/* 卡片 2 */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY2 }, { rotate: "5deg" }] },
          ]}
        >
          <ImageBackground
            source={require("./../assets/cardbg02.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.cardContent}>卡片 2 的内容</Text>
          </ImageBackground>
        </Animated.View>
        {/* 卡片 1 */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateY: translateY1 }, { rotate: "0deg" }] },
          ]}
        >
          <ImageBackground
            source={require("./../assets/cardbg01.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.cardContent}>卡片 1 的内容</Text>
            <Card style={styles.contentCard}>内容卡</Card>
          </ImageBackground>
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
    marginBottom: 10,
    zIndex: 1, 
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  cardContainer: {
    width: "100%", // 设置 cardContainer 的宽度为 100%
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // 让卡片叠在一起
  },
  card: {
    position: "absolute", // 让每张卡片叠在一起
    width: "90%", // 设置卡片宽度为 90%
    height: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android 上的阴影
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%", // 确保背景图像宽度为 100%
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageStyle: {
    borderRadius: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#333",
  },
  contentCard: {
    flex: 1,
    height: 100,
    width: 200,
    position: "absolute",
    bottom: 10,
    padding: 10,
    backgroundColor: "yellow",
  },
});

export default StackCards;