import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Button, TextArea, YStack, XStack } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { colors, borderWidth, spacing } from '../styles/styles';

export default function RichTextEditor({ content, setContent, images, setImages }) {
  async function handleImageInsert() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("Selected Image URI:", uri);
      setImages((prevImages) => [...prevImages, uri]);
    } else {
      console.log("Image selection was canceled or failed");
    }
  };

  return (
    <YStack flex={1} padding="$4">
      <XStack gap="$2">
        <Button onPress={handleImageInsert}>Insert Image</Button>
        <Button chromeless onPress={() => setContent('')}>Clear Text</Button>
      </XStack>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: spacing.md }}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: spacing.md }}
          />
        ))}
        <TextArea
          keyboardType="default"
          backgroundColor={colors.lightTheme}
          borderWidth={borderWidth.null}
          value={content}
          onChangeText={setContent}
          multiline
          flex={1}
          padding={spacing.md}
        />
      </ScrollView>
    </YStack>
  );
}
