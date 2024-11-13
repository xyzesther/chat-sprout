import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { YStack, SizableText } from "tamagui";
import { colors } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";

function ConversationBubble({ message, isSender, audio }) {
  const bubbleColor = isSender ? "white" : "ivory";

  return (
    <View
      style={[
        styles.container,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      {!isSender && (
        <View
          style={[styles.triangleLeft, { borderBottomColor: bubbleColor }]}
        />
      )}
      <YStack
        padding="$2"
        borderRadius="$5"
        backgroundColor={bubbleColor} // 根据 isSender 设置背景色
        maxWidth="90%"
        marginVertical="$2"
        flexDirection="row"
        alignItems="flex-start"
        position="relative"
      >
        {audio && (
          <TouchableOpacity
            onPress={() => console.log("Play audio:", audio)}
            style={styles.iconContainer}
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
      {isSender && (
        <View
          style={[styles.triangleRight, { borderBottomColor: bubbleColor }]}
        />
      )}
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
