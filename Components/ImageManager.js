import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Firebase/firebaseSetup';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
      quality: 0.1,
    });

    if (result.canceled || result.assets.length === 0) return null;
    return result.assets[0].uri;
  },

  // Select an Image from Library
  async selectFromLibrary() {
    const hasPermission = await this.verifyLibraryPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
    });

    if (result.canceled || result.assets.length === 0) return null;
    return result.assets[0].uri;
  },

  // Upload Image to Firebase storage
  async uploadImage(uri) {
    try {
      let uploadURL = "";
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `notes/${imageName}`);
      const uploadTask = await uploadBytesResumable(imageRef, blob);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },
};

export default ImageManager;
