import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import conversations from "../data/conversations.json";

export default function LearnScreen({ navigation }) {
  // const navigation = useNavigation();
  const topic1 = conversations[0].topics[0];
  const topic2 = conversations[0].topics[1];
  const topic3 = conversations[0].topics[2];
  // const topic4 = conversations[1].topics[0];
  // const topic5 = conversations[1].topics[1];
  // const topic6 = conversations[1].topics[2];
  // const topic7 = conversations[2].topics[0];
  // const topic8 = conversations[2].topics[1];
  // const topic9 = conversations[2].topics[2];

  return (
    <View>
      <Text>LearnScreen</Text>

      {/* add buttons of topics  */}
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

      {/* press the topic button leads to conversations of this topic */}

      {/* create a conversation page to display - navigation? go forth and go back */}
    </View>
  );
}

const styles = StyleSheet.create({});
