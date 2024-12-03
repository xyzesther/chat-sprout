import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ThoughtsCard from "../Components/ThoughtsCard";

const ThoughtsScreen = () => {
  const articles = [
    {
      title: "Real Over Perfect",
      pages: [
        "You don’t need to be perfect in every conversation—your small mistakes or awkward moments often go unnoticed by others. Even if someone notices, they’re rarely as important as you think. ",
        "These little flaws are what make you human, and they often make you more approachable and relatable. People value authenticity, not forced perfection. True relationships grow from ",
        "genuine connections, not from flawless performances. Be yourself and embrace what makes you unique—being real has a much stronger impact than trying to be perfect.",
      ],
      image1: require("./../assets/cardbg01.png"),
      image2: require("./../assets/cardbg02.png"),
      image3: require("./../assets/cardbg03.png"),
    },
    {
      title: "Permission to Pause",
      pages: [
        "Everyone has good days and bad days, and it’s normal to not feel like being social sometimes. Life can be busy and stressful, and there’s no rule that says you always have to talk to others. ",
        "It’s okay to listen to your feelings and take a break when you’re tired or overwhelmed. Socializing should bring happiness, not stress. Give yourself time to rest and recharge — it’s a simple way",
        "to take care of yourself. When you’re ready, you’ll feel more positive and ready to connect. Quality over quantity matters in relationships, and your well-being should always come first.",
      ],
      image1: require("./../assets/cardbg02.png"),
      image2: require("./../assets/cardbg03.png"),
      image3: require("./../assets/cardbg04.png"),
    },
    {
      title: "A Smile Goes a Long Way",
      pages: [
        "Short chats can totally make someone’s day! A smile, a quick “hi,” or a kind word can leave a bigger impression than you think. You don’t always need a deep, soul-searching conversation",
        "to connect — sometimes the little things say it all. Keep it light, keep it warm, and remember: it’s not about how long you talk, but how genuine you are.",
      ],
      image1: require("./../assets/cardbg05.png"),
      image2: require("./../assets/cardbg06.png"),
      image3: require("./../assets/cardbg07.png"),
    },
    {
      title: "It’s a Unique Journey",
      pages: [
        "Socializing is a skill you build over time—every conversation is a step forward. There’s no such thing as a “perfect” chat, and that’s totally okay.",
        "Each interaction is a chance to learn something new, whether it’s about the other person or even yourself.",
        "So, don’t stress about the outcome—just enjoy the process. The more you practice, the more natural it’ll feel, and hey, you’re already doing great!",
      ],
      image1: require("./../assets/cardbg08.png"),
      image2: require("./../assets/cardbg07.png"),
      image3: require("./../assets/cardbg06.png"),
    },
    {
      title: "Curiosity Leads the Way",
      pages: [
        "Curiosity about others’ thoughts and experiences opens the door to meaningful connections. Everyone carries a unique story, offering something new to discover and learn.",
        "Conversations aren’t about perfect responses or getting everything right—they’re about being present,",
        "enjoying the moment, and exploring the unknown. Each interaction is a small adventure, filled with opportunities to grow and connect. That’s what makes them so rewarding!",
      ],
      image1: require("./../assets/cardbg06.png"),
      image2: require("./../assets/cardbg04.png"),
      image3: require("./../assets/cardbg01.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ThoughtsCard article={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThoughtsScreen;