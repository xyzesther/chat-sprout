import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { YStack, SizableText, Spinner } from "tamagui";
import { colors } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

let currentPlayingSound = null;

let totalAudioCount = 0;
let loadedAudioCount = 0;
let allAudioLoaded = false;
const allAudioLoadedListeners = [];

function notifyAllAudioLoaded() {
  allAudioLoadedListeners.forEach((listener) => listener());
}

function ConversationBubble({ message, isSender, audio }) {
  const bubbleColor = isSender ? "white" : "ivory";
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(allAudioLoaded);

  useEffect(() => {
    totalAudioCount++;
    async function loadSound() {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({ uri: audio });
      setSound(sound);
      setIsLoading(false);
      loadedAudioCount++;

      if (loadedAudioCount === totalAudioCount) {
        allAudioLoaded = true;
        notifyAllAudioLoaded();
      }

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log("Playback finished");
          currentPlayingSound = null;
        }
      });
    }

    loadSound();

    return () => {
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, [audio]);

  async function playSound() {
    if (currentPlayingSound && currentPlayingSound !== sound) {
      console.log("Stopping current playing sound");
      await currentPlayingSound.stopAsync();
    }

    if (sound) {
      console.log("Playing Sound");
      currentPlayingSound = sound;
      await sound.replayAsync();
    }
  }

  useEffect(() => {
    const listener = () => setAllLoaded(true);
    allAudioLoadedListeners.push(listener);
    return () => {
      const index = allAudioLoadedListeners.indexOf(listener);
      if (index !== -1) {
        allAudioLoadedListeners.splice(index, 1);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      allAudioLoaded = false;
      totalAudioCount = 0;
      loadedAudioCount = 0;
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      {!isSender && (
        <View
          style={[styles.triangleLeft, { borderBottomColor: bubbleColor }]}
        />
      )}
      <YStack
        padding="$2"
        borderRadius="$5"
        backgroundColor={bubbleColor}
        maxWidth="90%"
        marginVertical="$2"
        flexDirection="row"
        alignItems="flex-start"
        position="relative"
      >
        {audio && (
          <TouchableOpacity onPress={playSound} style={styles.iconContainer}>
            {allLoaded ? (
              <Ionicons name="play-circle" size={24} color={colors.theme} />
            ) : (
              <Spinner size="small" color={colors.theme} />
            )}
          </TouchableOpacity>
        )}
        <View style={styles.messageContainer}>
          <SizableText size={"$5"} color="black" style={styles.text}>
            {message}
          </SizableText>
        </View>
      </YStack>
      {isSender && (
        <View
          style={[styles.triangleRight, { borderBottomColor: bubbleColor }]}
        />
      )}
    </View>
  );
}

export default ConversationBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
    marginHorizontal: 10,
  },
  senderContainer: {
    justifyContent: "flex-end",
  },
  receiverContainer: {
    justifyContent: "flex-start",
  },
  triangleLeft: {
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "45deg" }],
    marginRight: -6,
  },
  triangleRight: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "-45deg" }],
    marginLeft: -6,
  },
  iconContainer: {
    marginRight: 4,
    width: 30,
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    flexShrink: 1,
  },
});
