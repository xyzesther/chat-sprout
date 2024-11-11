import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ConversationCard from "../Components/ConversationCard";

const ConversationScreen = ({ route }) => {
  const { topic } = route.params;

  return (
    <View style={styles.container}>
      {topic.conversations.map((conversation) => (
        <ConversationCard
          key={conversation.conversation_id}
          conversation={conversation}
        />
      ))}
    </View>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
