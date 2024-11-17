import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = {
  // Verify Camera Permissions
  async verifyCameraPermission() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Required', 'Camera access is required to take a photo.');
      return false;
    }
    return true;
  },

  // Verify Library Permissions
  async verifyLibraryPermission() {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Required', 'Library access is required to select an image.');
      return false;
    }
    return true;
  },

  // Take a Photo
  async takePhoto() {
    const hasPermission = await this.verifyCameraPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    return !result.canceled && result.assets.length > 0 ? result.assets[0].uri : null;
  },

  // Select an Image from Library
  async selectFromLibrary() {
    const hasPermission = await this.verifyLibraryPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    return !result.canceled && result.assets.length > 0 ? result.assets[0].uri : null;
  },
};

export default ImageManager;
