import React from 'react';
import { ScrollView, Image } from 'react-native';
import { TextArea, YStack, View } from 'tamagui';
import { colors, borderWidth, spacing, borderRadius } from '../styles/styles';
import { XCircle } from '@tamagui/lucide-icons';

export default function RichTextEditor({ content, setContent, images, onImageRemove }) {

  return (
    <YStack flex={1} padding="$4">
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          marginBottom: spacing.md,
        }}
      >
        <YStack 
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {images.map((uri, index) => (
            <View
              key={index}
              style={{ 
                width: '30%', 
                height: 100, 
                marginBottom: spacing.md, 
                marginRight: spacing.md,
                position: 'relative',
              }}
            >
              <Image
                source={{ uri }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: borderRadius.md,
                }}
              />
              <XCircle
                color={colors.icon.unfocused}
                onPress={() => onImageRemove(index)}
                style={{
                  position: 'absolute',
                  right: 0,
                  backgroundColor: colors.background.transparent,
                  borderRadius: borderRadius.lg,
                  padding: spacing.xs,
                }}
              />
            </View>
          ))}
        </YStack>
        <TextArea
          keyboardType="default"
          backgroundColor={colors.lightTheme}
          borderWidth={borderWidth.null}
          value={content}
          onChangeText={setContent}
          multiline
          placeholder="Type your note here..."
          flex={1}
          padding={spacing.md}
        />
      </ScrollView>
    </YStack>
  );
}
