import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { writeToDB } from '../Firebase/firebaseHelper';
import { Button } from 'tamagui';

export default function AddNoteScreen({ navigation }) {
  const [noteContent, setNoteContent] = useState('');
  const collectionName = 'notes';

  async function handleSaveNote() {
    if (noteContent.trim()) {
      // Automatically set the first line of the note as the title
      const lines = noteContent.split('\n');
      const title = noteContent.split('\n')[0];
      const content = lines.slice(1).join('\n');
       
      // Create a new note document
      const newNote = {
        title: title,
        content: content,
        timestamp: new Date().toISOString(),
      };

      // Call the writeToDB function to write the note to the database  
      try {
        await writeToDB(collectionName, newNote);
        navigation.goBack();
      } catch (error) {
        console.log('Error adding a new note: ', error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        placeholder='Type Something Here!' 
        keyboardType='default' 
        style={styles.input}
        value={noteContent}
        onChangeText={setNoteContent}
        multiline={true}
      />
      <Button 
        onPress={handleSaveNote}
      >
        Save Note
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
});
