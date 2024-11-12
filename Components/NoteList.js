import React from 'react';
import { Button, ListItem, Separator, YGroup } from 'tamagui';
import { ChevronRight, XCircle } from '@tamagui/lucide-icons';
import { colors, image } from '../styles/styles';
import AntDesign from '@expo/vector-icons/AntDesign';

export function NoteList({ notes, onNotePress, onDeletePress }) {
  return (
    <YGroup alignSelf="center" bordered width={"95%"} size="$5" separator={<Separator />}>
      {notes.map((note, index) => (
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
          />
        </YGroup.Item>
      ))}
    </YGroup>
  );
}
