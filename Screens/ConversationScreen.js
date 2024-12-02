import { StyleSheet, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ConversationCard from "../Components/ConversationCard";
import { writeToDB } from "../Firebase/firebaseHelper";
import Toast from "react-native-toast-message";
import { spacing } from "../styles/styles";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../Firebase/firebaseSetup";

export default function ConversationScreen({ route }) {
  const { topic } = route.params;
  const [conversations, setConversations] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    console.log("Topic:", topic);

    async function fetchConversations() {
      try {
        const conversationsCollectionRef = collection(
          firestore,
          `themes/${topic.theme}/topics/${topic.topic}/conversations`
        );
        const querySnapshot = await getDocs(conversationsCollectionRef);
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(fetchedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    }

    fetchConversations();
  }, [firestore, topic]);

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
              owner: auth.currentUser.uid,
            };

            try {
              await writeToDB("notes", newNote);

              // Show success toast
              Toast.show({
                type: "success",
                text1: "Save Successful",
                text2: "You can view and edit it in the notebook.",
                position: "top",
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
        key={item.id}
        conversation={item}
        onAddToNotebook={handleAddToNotebook}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

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
