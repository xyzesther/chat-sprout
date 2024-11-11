import { StyleSheet, View, Button } from "react-native";
import React from "react";
import conversationData from "../data/conversations.json";

export default function LearnScreen({ navigation }) {
  const topic1 = conversationData[0].topics[0];
  const topic2 = conversationData[0].topics[1];
  const topic3 = conversationData[0].topics[2];
  const topic4 = conversationData[1].topics[0];
  const topic5 = conversationData[1].topics[1];
  const topic6 = conversationData[1].topics[2];
  const topic7 = conversationData[2].topics[0];
  const topic8 = conversationData[2].topics[1];
  const topic9 = conversationData[2].topics[2];

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

      <Button
        title={topic4.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic4.topic_name,
            topic: topic4,
          })
        }
      />

      <Button
        title={topic5.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic5.topic_name,
            topic: topic5,
          })
        }
      />

      <Button
        title={topic6.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic6.topic_name,
            topic: topic6,
          })
        }
      />

      <Button
        title={topic7.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic7.topic_name,
            topic: topic7,
          })
        }
      />

      <Button
        title={topic8.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic8.topic_name,
            topic: topic8,
          })
        }
      />

      <Button
        title={topic9.topic_name}
        onPress={() =>
          navigation.navigate("ConversationScreen", {
            title: topic9.topic_name,
            topic: topic9,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
