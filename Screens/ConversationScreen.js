import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ConversationCard from "../Components/ConversationCard";

const ConversationScreen = ({ route }) => {
  const { topic } = route.params;

  const renderItem = ({ item }) => (
    <ConversationCard
      key={item.conversation_id}
      conversation={item}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={topic.conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.conversation_id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
});