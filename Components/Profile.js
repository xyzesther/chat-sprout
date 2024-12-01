import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fontSize } from "../styles/styles";
import { Button, Card } from "tamagui";
import { colors } from "../styles/styles";
import ProfileEditPassword from "./ProfileEditPassword";
import ProfileEditName from "./ProfileEditName";
import { auth } from "../Firebase/firebaseSetup";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Profile = ({ setIsUserLoggedIn }) => {
  const [isPasswordSheetOpen, setPasswordSheetOpen] = useState(false);
  const [isNameSheetOpen, setNameSheetOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setIsUserLoggedIn(false);
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Button onPress={handleLogout} style={styles.logoutButton}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Button>
        </View>
      </View>

      <Text>---- auth data ----</Text>
      <Text>auth.currentUser.email: {auth.currentUser.email}</Text>
      <Text>auth.currentUser.uid: {auth.currentUser.uid}</Text>

      <Text>---- userData ----</Text>
      {userData ? (
        <>
          <Text style={styles.info}>Username: {userData.displayName}</Text>
          <Text style={styles.info}>Email: {auth.currentUser?.email}</Text>
          <Text style={styles.info}>Points: {userData.points}</Text>
          <Text style={styles.info}>
            Notifications Enabled: {userData.notificationEnabled ? "Yes" : "No"}
          </Text>
          <Text style={styles.info}>Photo</Text>
          <Image
            source={{ uri: userData.photoURL }}
            style={styles.profileImage}
          />
          <Text style={styles.info}>
            Account Created At:{" "}
            {userData.createdAt?.toDate().toLocaleString() || "N/A"}
          </Text>
        </>
      ) : (
        <Text>No user data available</Text>
      )}

      <Card
        paddingVertical="$2"
        marginVertical="$3"
        backgroundColor={colors.lightTheme}
        style={styles.cardContainer}
      >
        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}>Email</Text>
          <Text style={styles.display}>{auth.currentUser.email}</Text>
          <View style={styles.edit} />
        </Card>
        <View style={styles.separator} />

        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}>Password</Text>
          <Text style={styles.display}>********</Text>
          <View style={styles.edit}>
            <Button onPress={() => setPasswordSheetOpen(true)}>Edit</Button>
          </View>
        </Card>
        <View style={styles.separator} />

        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}>Name</Text>
          <Text style={styles.display}>{userData.displayName}</Text>
          <View style={styles.edit}>
            <Button onPress={() => setNameSheetOpen(true)}>Edit</Button>
          </View>
        </Card>
      </Card>

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
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginRight: 5,
    fontSize: fontSize.body,
  },
  logoutButton: {
    width: "15%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  cardContainer: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  item: {
    flex: 3,
  },
  display: {
    flex: 4,
  },
  edit: {
    flex: 3,
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});
