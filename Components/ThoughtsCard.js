import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, ImageBackground, TouchableOpacity } from "react-native";
import { Card } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/styles";

const ThoughtsCard = ({ article }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < article.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 创建一些动画值
  const translateY1 = new Animated.Value(0);
  const translateY2 = new Animated.Value(-5);
  const translateY3 = new Animated.Value(-10);

  return (
    <View style={styles.cardContainer}>
      {/* 卡片 3 */}
      <Animated.View
        style={[
          styles.card,
          { transform: [{ translateY: translateY3 }, { rotate: "-3deg" }] },
        ]}
      >
        <ImageBackground
          source={article.image3}
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
          source={article.image2}
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
          source={article.image1}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Card style={styles.contentCard}>
            <View style={styles.contentCardRow}>
              <Text style={styles.cardTitle}>{article.title}</Text>
            </View>
            <View style={[styles.contentCardRow, styles.contentRow]}>
              <TouchableOpacity style={styles.buttonLeft} onPress={handlePrevPage}>
                <Ionicons name="chevron-back" size={24} color={colors.theme} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.cardContent}>{article.pages[currentPage]}</Text>
              </View>
              <TouchableOpacity style={styles.buttonRight} onPress={handleNextPage}>
                <Ionicons name="chevron-forward" size={24} color={colors.theme} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentCardRow}>
              <Text style={styles.pageIndicator}>{`${currentPage + 1}/${article.pages.length}`}</Text>
            </View>
          </Card>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", // 设置 cardContainer 的宽度为 100%
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // 让卡片叠在一起
    marginBottom: 20, // 每个卡片之间的间距
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
  contentCard: {
    flex: 1,
    height: "95%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "column", // 将 contentCard 分成三行
  },
  contentCardRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentRow: {
    flex: 4,
    flexDirection: "row", // 将第二行分成三列
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
    textAlign: "center",
    color: colors.theme,
  },
  cardContent: {
    fontSize: 18,
    color: "#333",
    textAlign: "left", // 将文本靠左排列
    color: colors.theme,
  },
  pageIndicator: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    color: colors.theme,
  },
  buttonLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThoughtsCard;