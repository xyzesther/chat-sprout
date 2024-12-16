import React from 'react';
import { Button, ListItem, Separator, Text, YGroup } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { colors, fontSize, spacing } from '../styles/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';

export function NoteList({ notes, onNotePress, onDeletePress }) {
  const sortedNotes = [...notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <YGroup alignSelf="center" bordered width={"95%"} size="$5" separator={<Separator />}>
      {sortedNotes.map((note, index) => (
        <YGroup.Item key={note.id || index}>
          <ListItem
            hoverTheme
            pressTheme
            title={<Text style={styles.title}>{note.title}</Text>}
            subTitle={<Text style={styles.subTitle}>{new Date(note.timestamp).toDateString()}</Text>}
            icon={
              <Button 
                onPress={() => onDeletePress(note)}
                backgroundColor={colors.background.transparent}
              >
                <AntDesign name="delete" color={colors.icon.unfocused} />
              </Button>
            }
            iconAfter={<ChevronRight color={colors.icon.unfocused}/>}
            onPress={() => onNotePress(note)}
            backgroundColor={colors.lightTheme}
          />
        </YGroup.Item>
      ))}
    </YGroup>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.body,
    fontFamily: "Lato",
  },

  subTitle: {
    fontSize: fontSize.tab,
    color: colors.text.unfocused,
    fontFamily: "Lato",
  },
});