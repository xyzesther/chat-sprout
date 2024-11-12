import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Button, TextArea, YStack, View } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { colors, borderWidth, spacing, borderRadius, image } from '../styles/styles';
import { Camera, XCircle } from '@tamagui/lucide-icons';

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

  function handleDeleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

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
                onPress={() => handleDeleteImage(index)}
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
          flex={1}
          padding={spacing.md}
        />
      </ScrollView>

      <Button 
        icon={Camera} 
        size="$2" 
        borderColor={colors.theme}
        onPress={handleImageInsert}
        style={{
          position: 'absolute',
          bottom: spacing.lg,
          right: spacing.lg,
          width: image.buttonImg,
          height: image.buttonImg,
          borderRadius: borderRadius.xl,
          backgroundColor: colors.theme,
        }}
      />
    </YStack>
  );
}
