import React from 'react';
import { Button, ListItem, Separator, YGroup } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { colors } from '../styles/styles';
import AntDesign from '@expo/vector-icons/AntDesign';

export function NoteList({ notes, onNotePress, onDeletePress }) {
  const sortedNotes = [...notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <YGroup alignSelf="center" bordered width={"95%"} size="$5" separator={<Separator />}>
      {sortedNotes.map((note, index) => (
        <YGroup.Item key={note.id || index}>
          <ListItem
            hoverTheme
            pressTheme
            title={note.title}
            subTitle={new Date(note.timestamp).toDateString()}
            icon={
              <Button 
                onPress={() => onDeletePress(note)}
                backgroundColor={colors.background.transparent}
              >
                <AntDesign name="delete" color={colors.icon.black} />
              </Button>
            }
            iconAfter={<ChevronRight />}
            onPress={() => onNotePress(note)}
            backgroundColor={colors.lightTheme}
          />
        </YGroup.Item>
      ))}
    </YGroup>
  );
}
