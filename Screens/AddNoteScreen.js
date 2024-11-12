import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { updateToDB, writeToDB } from '../Firebase/firebaseHelper';
import { Button } from 'tamagui';
import RichTextEditor from '../Components/RichTextEditor';
import { borderWidth, colors, fontSize, image } from '../styles/styles';

export default function AddNoteScreen({ navigation, route }) {
  const existingNote = route.params?.note;
  const [noteContent, setNoteContent] = useState(existingNote ? `${existingNote.title}\n${existingNote.content}` : '');
  const [images, setImages] = useState(existingNote?.images || []);
  const collectionName = 'notes';

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

  async function handleSaveNote() {
    if (noteContent.trim() || images.length > 0) {
      // Automatically set the first line of the note as the title
      const lines = noteContent.split('\n');
      const title = lines[0];
      const content = lines.slice(1).join('\n');

      console.log("Images to be saved:", images);
       
      // Create a new note document
      const newNote = {
        title: title,
        content: content,
        images: images,
        timestamp: new Date().toISOString(),
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
        console.log('Error adding a new note: ', error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <RichTextEditor
        content={noteContent}
        setContent={setNoteContent}
        images={images}
        setImages={setImages}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightTheme,
  },
});
