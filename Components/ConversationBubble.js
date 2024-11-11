import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { YStack, SizableText } from "tamagui";
import { colors } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";

function ConversationBubble({ message, isSender, audio }) {
  return (
    <View
      style={[
        styles.container,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      {!isSender && <View style={styles.triangleLeft} />}
      <YStack
        padding="$2"
        borderRadius="$5"
        backgroundColor={colors.lightTheme}
        maxWidth="90%"
        marginVertical="$2"
        flexDirection="row"
        alignItems="flex-start"
        position="relative" // 确保子元素可以使用绝对定位
      >
        {audio && (
          <TouchableOpacity
            onPress={() => console.log("Play audio:", audio)}
            style={styles.iconContainer} // 使用绝对定位的样式
          >
            <Ionicons name="play-circle" size={24} color={colors.theme} />
          </TouchableOpacity>
        )}
        <View style={styles.messageContainer}>
          <SizableText size={"$5"} color="black" style={styles.text}>
            {message}
          </SizableText>
        </View>
      </YStack>
      {isSender && <View style={styles.triangleRight} />}
    </View>
  );
}

export default ConversationBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
    marginHorizontal: 10,
  },
  senderContainer: {
    justifyContent: "flex-end",
  },
  receiverContainer: {
    justifyContent: "flex-start",
  },
  triangleLeft: {
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.lightTheme,
    transform: [{ rotate: "45deg" }],
    marginRight: -6,
  },
  triangleRight: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: colors.lightTheme,
    transform: [{ rotate: "-45deg" }],
    marginLeft: -6,
  },
  iconContainer: {
    marginRight: 4,
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    flexShrink: 1,
  },
});
