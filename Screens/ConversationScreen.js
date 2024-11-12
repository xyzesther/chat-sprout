import { StyleSheet, View, FlatList, Alert } from "react-native";
import React, { useEffect } from "react";
import ConversationCard from "../Components/ConversationCard";
import { writeToDB } from "../Firebase/firebaseHelper";
import Toast from 'react-native-toast-message';
import { spacing } from "../styles/styles";

export default function ConversationScreen({ route }) {
  const { topic } = route.params;
  // const toast = useToastController();

  async function handleAddToNotebook(conversation) {
    Alert.alert(
      "Add to Notebook",
      "Are you sure you want to add this conversation to your notebook?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: async () => {
            const newNote = {
              title: `${conversation.content1}`,
              content: `${conversation.content2}`,
              timestamp: new Date().toISOString(),
            };

            try {
              await writeToDB("notes", newNote);
              
              // Show success toast
              Toast.show({
                type: 'success',
                text1: 'Save Successful',
                text2: 'You can view and edit it in the notebook.',
                position: 'top',
                topOffset: 120,
              });
            } catch (error) {
              console.log("Error adding note:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  function renderItem({ item }) {
    return (
      <ConversationCard
        key={item.conversation_id}
        conversation={item}
        onAddToNotebook={handleAddToNotebook}
      />
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },

  listContent: {
    paddingBottom: spacing.md,
  },
});