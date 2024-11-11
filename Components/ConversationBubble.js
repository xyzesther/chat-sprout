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
        borderRadius="$6"
        backgroundColor={colors.lightTheme}
        maxWidth="90%"
        marginVertical="$2"
        flexDirection="row"
        alignItems="center"
      >
        {audio && (
          <TouchableOpacity onPress={() => console.log("Play audio:", audio)}>
            <Ionicons
              name="play-circle"
              size={24}
              color={colors.theme}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <SizableText size={"$5"} color="black" style={styles.text}>
          {message}
        </SizableText>
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
  icon: {
    marginRight: 8,
  },
  text: {
    flexShrink: 1,
  },
});
