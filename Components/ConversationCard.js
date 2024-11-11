import { StyleSheet, View } from "react-native";
import React from "react";
import ConversationBubble from "./ConversationBubble";
import { Card } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../styles/styles";

const ConversationCard = ({ conversation }) => {
  return (
    <View style={styles.card}>
      <Card paddingVertical="$2" marginVertical="$3" backgroundColor="#C6C6E6">
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="notebook-plus"
            size={24}
            color={colors.theme}
          />
        </View>
        <ConversationBubble
          message={conversation.content1}
          isSender={false}
          audio={conversation.audio1}
        />
        <ConversationBubble
          message={conversation.content2}
          isSender={true}
          audio={conversation.audio2}
        />
      </Card>
    </View>
  );
};

export default ConversationCard;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
