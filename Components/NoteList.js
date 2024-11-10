import React from 'react';
import { ListItem, Separator, XStack, YGroup } from 'tamagui';
import { ChevronRight, Asterisk } from '@tamagui/lucide-icons';

export function NoteList({ notes, onNotePress }) {
  return (
    <YGroup alignSelf="center" bordered width={"95%"} size="$5" separator={<Separator />}>
      {notes.map((note, index) => (
        <YGroup.Item key={note.id || index}>
          <ListItem
            hoverTheme
            pressTheme
            icon={Asterisk}
            title={note.title}
            subTitle={note.content}
            iconAfter={ChevronRight}
            onPress={() => onNotePress(note)}
          />
        </YGroup.Item>
      ))}
    </YGroup>
  );
}