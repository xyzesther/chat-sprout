import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, Alert } from "react-native";
import { Card, YStack, XStack } from "tamagui";
import { auth } from "../Firebase/firebaseSetup";
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, fontSize, spacing } from "../styles/styles";
import ProfileEditPassword from "./ProfileEditPassword";
import ProfileEditName from "./ProfileEditName";

export default function Profile({ setIsUserLoggedIn }) {
  const [isPasswordSheetOpen, setPasswordSheetOpen] = useState(false);
  const [isNameSheetOpen, setNameSheetOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  async function fetchUserData() {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.error("No user is logged in.");
        return;
      }

      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.error("No user data found for UID:", uid);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Logout handler
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("User signed out");
      setIsUserLoggedIn(false);
    } catch (err) {
      console.error("Sign out error", err);
      Alert.alert("Error", "Unable to sign out. Please try again.");
    }
  };

  function handleSavePassword(newPassword) {
    console.log(`Updated Password: ${newPassword}`);
  };

  function handleSaveName(newName) {
    console.log(`Updated Name: ${newName}`);
    fetchUserData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="grey" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <YStack padding="$4" space>
      <XStack justifyContent="space-between" alignItems="center">
        <Text style={styles.title}>Profile</Text>
        <MaterialIcons name="logout" onPress={handleLogout} style={styles.logoutIcon} />
      </XStack>

      {/* User Profile Section */}
      <Card padding="$4" borderRadius="$4" shadow>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: userData?.photoURL }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <YStack gap="$2">
              <XStack alignItems="center" gap="$2">
                <Text style={styles.userName}>{userData?.displayName || "Username"}</Text>
                <Text
                  style={styles.editProfileText}
                  onPress={() => setNameSheetOpen(true)}
                >
                  Change Name
                </Text>
              </XStack>
              <XStack alignItems="center" gap="$2">
                <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
                <Text
                  style={styles.editProfileText}
                  onPress={() => setPasswordSheetOpen(true)}
                >
                  Edit Password
                </Text>
              </XStack>
              <Text>Points: {userData?.points || 0}</Text>
              <Text>Account Created: {userData?.createdAt?.toDate().toLocaleDateString() || "N/A"}</Text>
            </YStack>
          </View>
        </View>
      </Card>

      {/* Edit Modals */}
      <ProfileEditPassword
        isOpen={isPasswordSheetOpen}
        onClose={() => setPasswordSheetOpen(false)}
        onSave={handleSavePassword}
      />
      <ProfileEditName
        isOpen={isNameSheetOpen}
        onClose={() => setNameSheetOpen(false)}
        onSave={handleSaveName}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },

  logoutIcon: {
    fontSize: fontSize.header,
    color: colors.theme,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: spacing.lg,
  },

  userName: {
    fontSize: fontSize.title,
    fontWeight: "bold",
  },

  userEmail: {
    fontSize: fontSize.body,
    color: colors.text.black,
  },

  editProfileText: {
    color: colors.theme,
    fontSize: fontSize.tab,
    textDecorationLine: "underline",
  },
});
