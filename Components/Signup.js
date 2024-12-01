import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const db = getFirestore();

  const loginHandler = () => {
    navigation.replace("Login");
  };
  const signupHandler = async () => {
    try {
      // do some data validation
      // no field should be empty
      // valid email address @ .
      // password and confirm password match
      if (password !== confirmPassword) {
        Alert.alert("Password and confirm password should match");
        return;
      }

      if (
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
      ) {
        Alert.alert("No field should be empty");
        return;
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("New Account Created: ", userCred);

      // Add user document to Firestore
      if (userCred.user.uid) {
        const userDocRef = doc(db, "users", userCred.user.uid); // Use UID as the document ID
        await setDoc(userDocRef, {
          displayName: "new sprout",
          notificationEnabled: false,
          createdAt: serverTimestamp(),
          points: 0,
          photoURL:
            "https://scontent.fyvr3-1.fna.fbcdn.net/v/t39.30808-6/301507690_444882737660603_6815372983150332319_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZBpiOhvwpDgQ7kNvgGY20Z2&_nc_zt=23&_nc_ht=scontent.fyvr3-1.fna&_nc_gid=AG60tJNetbztRGXNaNpT3cv&oh=00_AYDwyHWHSqUnMuod_6pM9HGcwCwRIEjj9W8UTC3AUyg4yw&oe=6751A62C",
        });

        console.log("User successfully signed up and added to Firestore!");
        Alert.alert("Registration successful!", "You can now log in.");
        navigation.replace("Login"); // Redirect to login page after signup
      }
    } catch (err) {
      console.log("Sign up ", err.code);
      // tell user if an error happens
      if (err.code === "auth/weak-password") {
        Alert.alert("Your password should be at least 6 characters");
      }
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});
