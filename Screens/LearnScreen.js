import { StyleSheet, View, Button } from "react-native";
import React from "react";
import conversationData from "../data/conversations.json";

export default function LearnScreen({ navigation }) {
  const topic1 = conversationData[0].topics[0];
  const topic2 = conversationData[0].topics[1];
  const topic3 = conversationData[0].topics[2];
  // const topic4 = conversationData[1].topics[0];
  // const topic5 = conversationData[1].topics[1];
  // const topic6 = conversationData[1].topics[2];
  // const topic7 = conversationData[2].topics[0];
  // const topic8 = conversationData[2].topics[1];
  // const topic9 = conversationData[2].topics[2];

  return (
    <View>
      <Button
        title={topic1.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic1.topic_name,
            topic: topic1,
          })
        }
      />
      <Button
        title={topic2.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic2.topic_name,
            topic: topic2,
          })
        }
      />
      <Button
        title={topic3.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic3.topic_name,
            topic: topic3,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
