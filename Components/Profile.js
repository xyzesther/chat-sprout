import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { fontSize } from "../styles/styles";
import { Button, Card } from "tamagui";
import { colors } from "../styles/styles";
import ProfileEditPassword from "./ProfileEditPassword";
import ProfileEditName from "./ProfileEditName";
import { auth } from "../Firebase/firebaseSetup";


const Profile = () => {
  const [isPasswordSheetOpen, setPasswordSheetOpen] = useState(false);
  const [isNameSheetOpen, setNameSheetOpen] = useState(false);

  const handleSavePassword = (newPassword) => {
    console.log(`Updated Password: ${newPassword}`);
  };

  const handleSaveName = (newName) => {
    console.log(`Updated Name: ${newName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>

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
          <Text style={styles.display}>abc@email.com</Text>
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
          <Text style={styles.display}>abcnameabc</Text>
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
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
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
});
