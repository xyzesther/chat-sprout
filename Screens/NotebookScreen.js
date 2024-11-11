import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { NoteList } from '../Components/NoteList';
import { SearchBar } from '../Components/SearchBar';
import { database } from '../Firebase/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Button, ScrollView, Input, XStack } from 'tamagui';
import { Plus, Search, XCircle } from '@tamagui/lucide-icons';
import { colors, spacing, borderRadius, borderWidth } from '../styles/styles';

export default function NotebookScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNotePress = (note) => {
    console.log('Selected note:', note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </View>
        <View style={styles.noteList}>
          {notes.length === 0 ? (
            <Text style={styles.noteListEmptyText}>Add a note to get started!</Text>
          ) : filteredNotes.length > 0 ? (
            <NoteList notes={filteredNotes} onNotePress={handleNotePress} />
          ) : (
            <Text style={styles.noteListEmptyText}>No notes found for "{searchQuery}"</Text>
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

  searchBar: {
    padding: spacing.md,
  },

  noteList: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },

  noteListEmptyText: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.text.black,
  },
});