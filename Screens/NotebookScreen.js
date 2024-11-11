import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { NoteList } from '../Components/NoteList';
import { database } from '../Firebase/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Button, ScrollView } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { colors, spacing } from '../styles/styles';

export default function NotebookScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const collectionName = 'notes';

  useEffect(() => {
    navigation.setOptions({
      title: 'Notebook',
      headerRight: () => (
        <Button
          size="$2"
          chromeless
          color="white"
          icon={Plus}
          onPress={() => navigation.navigate('AddNote')}
        >
          Add Note
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, collectionName), (snapshot) => {
      const fetchedNotes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(fetchedNotes);
    });
    return () => unsubscribe();
  }, []);

  const handleNotePress = (note) => {
    console.log('Selected note:', note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView> 
        <View style={styles.noteList}>
          {notes.length > 0 ? (
            <NoteList notes={notes} onNotePress={handleNotePress} />
          ) : (
            <Text style={styles.noteListEmptyText}>
              Add a note to get started!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },

  noteList: {
    flex: 1,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },

  noteListEmptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
});