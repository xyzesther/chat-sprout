import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { updateToDB, writeToDB } from "../Firebase/firebaseHelper";
import { Button, Sheet } from "tamagui";
import RichTextEditor from "../Components/RichTextEditor";
import ImageManager from "../Components/ImageManager";
import {
  colors,
  fontSize,
  image,
  spacing,
  borderRadius,
} from "../styles/styles";
import { Camera } from "@tamagui/lucide-icons";
import { auth } from "../Firebase/firebaseSetup";

export default function AddNoteScreen({ navigation, route }) {
  const existingNote = route.params?.note;
  const [noteContent, setNoteContent] = useState(
    existingNote ? `${existingNote.title}\n${existingNote.content}` : ""
  );
  const [images, setImages] = useState(existingNote?.images || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const collectionName = "notes";

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="$2"
          chromeless
          color={colors.text.primary}
          fontSize={fontSize.body}
          onPress={handleSaveNote}
        >
          {existingNote ? "Update" : "Save"}
        </Button>
      ),
    });
  }, [navigation, noteContent, images]);

  async function handleImageAction(actionType) {
    let uri;
    if (actionType === "library") {
      uri = await ImageManager.selectFromLibrary();
    } else if (actionType === "camera") {
      uri = await ImageManager.takePhoto();
    }

    if (uri) {
      const downloadURL = await ImageManager.uploadImage(uri);
      if (downloadURL) {
        setImages((prevImages) => [...prevImages, downloadURL]);
      } else {
        Alert.alert(
          "Upload Failed",
          "Unable to upload the image. Please try again."
        );
      }
    }
    setIsModalOpen(false);
  }

  async function handleSaveNote() {
    if (noteContent.trim() || images.length > 0) {
      // Automatically set the first line of the note as the title
      const lines = noteContent.split("\n");
      const title = lines[0];
      const content = lines.slice(1).join("\n");

      // Create a new note document
      const newNote = {
        title: title,
        content: content,
        images: images,
        timestamp: new Date().toISOString(),
        owner: auth.currentUser.uid,
      };

      // Call the updateToDB or writeToDB function to write the note to the database
      try {
        if (existingNote) {
          await updateToDB(collectionName, existingNote.id, newNote);
        } else {
          await writeToDB(collectionName, newNote);
        }
        navigation.goBack();
      } catch (error) {
        console.log("Error adding a new note: ", error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <RichTextEditor
        content={noteContent}
        setContent={setNoteContent}
        images={images}
        onImageAdd={() => setIsModalOpen(true)}
        onImageRemove={(index) =>
          setImages((prevImages) => prevImages.filter((_, i) => i !== index))
        }
      />

      <Button
        icon={Camera}
        size="$2"
        borderColor={colors.theme}
        onPress={() => setIsModalOpen(true)}
        style={{
          position: "absolute",
          bottom: spacing.xl,
          right: spacing.xl,
          width: image.buttonImg,
          height: image.buttonImg,
          borderRadius: borderRadius.xl,
          backgroundColor: colors.theme,
        }}
      />
      <Sheet
        modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        snapPoints={[20]}
      >
        <Sheet.Frame>
          <Sheet.Handle />
          <Button
            onPress={() => handleImageAction("library")}
            style={styles.button}
          >
            Select from Library
          </Button>
          <Button
            onPress={() => handleImageAction("camera")}
            style={styles.button}
          >
            Take a Photo
          </Button>
          <Button
            onPress={() => setIsModalOpen(false)}
            style={[styles.button, { color: colors.text.black }]}
          >
            Cancel
          </Button>
        </Sheet.Frame>
      </Sheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightTheme,
  },

  button: {
    padding: spacing.md,
    backgroundColor: colors.background.transparent,
    color: colors.text.secondary,
  },
});
