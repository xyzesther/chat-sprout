import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ConversationBubble from "./ConversationBubble";
import { Card } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors, image, spacing } from "../styles/styles";

export default function ConversationCard({ conversation, onAddToNotebook }) {
  return (
    <View style={styles.card}>
      <Card paddingVertical="$2" marginVertical="$3" backgroundColor={colors.background.card}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => onAddToNotebook(conversation)} style={{ padding: spacing.sm }}>
            <MaterialCommunityIcons
              name="notebook-plus"
              size={image.iconImg}
              color={colors.theme}
            />
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
  },
});
