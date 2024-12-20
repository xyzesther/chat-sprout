import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
  image,
  spacing,
} from "../styles/styles";
import { Lock, Mail } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export default function SignupScreen({ navigation }) {
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
      if (!email || !password || !confirmPassword) {
        Alert.alert("No field should be empty");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Password and confirm password should match");
        return;
      }
      const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email) === false) {
        Alert.alert("Please enter a valid email address");
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
          createdAt: serverTimestamp(),
          points: 0,
          photoURL:
            "https://scontent.fyvr3-1.fna.fbcdn.net/v/t39.30808-6/301507690_444882737660603_6815372983150332319_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZBpiOhvwpDgQ7kNvgGY20Z2&_nc_zt=23&_nc_ht=scontent.fyvr3-1.fna&_nc_gid=AG60tJNetbztRGXNaNpT3cv&oh=00_AYDwyHWHSqUnMuod_6pM9HGcwCwRIEjj9W8UTC3AUyg4yw&oe=6751A62C",
        });
        console.log("User successfully signed up and added to Firestore!");
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
      <View>
        {/* Ellipse 1 */}
        <View style={styles.ellipse1} />
        {/* Ellipse 2 */}
        <View style={styles.ellipse2} />
      </View>
      <Text style={styles.title}>Chat Sprout</Text>
      <Text style={styles.subtitle}>
        Master small talk and networking – your guide to confident
        conversations!
      </Text>

      <Text style={styles.signupText}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Mail style={styles.icon} size={image.iconImg} color={colors.theme} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(changedText) => {
            setEmail(changedText);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock style={styles.icon} size={image.iconImg} color={colors.theme} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(changedText) => {
            setPassword(changedText);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock style={styles.icon} size={image.iconImg} color={colors.theme} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(changedText) => {
            setConfirmPassword(changedText);
          }}
        />
      </View>

      <Button
        title="Register"
        onPress={signupHandler}
        style={styles.button}
        textProps={{
          fontSize: fontSize.body,
          fontWeight: "bold",
          color: colors.text.primary,
        }}
      >
        Register
      </Button>
      <Text title="Login" onPress={loginHandler} style={styles.loginText}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window").width;
const dynamicFontSize = width > 360 ? 36 : 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: spacing.md,
    overflow: "hidden",
  },

  // Ellipse 1
  ellipse1: {
    position: "absolute",
    width: 460,
    height: 460,
    left: -450,
    top: 200,
    backgroundColor: colors.lightTheme,
    borderRadius: 230,
  },

  // Ellipse 2
  ellipse2: {
    position: "absolute",
    width: 460,
    height: 460,
    left: -250,
    top: 500,
    backgroundColor: colors.midTheme,
    borderRadius: 230,
  },

  title: {
    fontFamily: "Aclonica",
    fontSize: dynamicFontSize,
    fontWeight: "400",
    lineHeight: 41,
    color: colors.theme,
    textAlign: "center",
    marginTop: height * 0.12,
    marginBottom: spacing.lg,
  },

  subtitle: {
    color: colors.theme,
    fontFamily: "Roboto",
    fontSize: fontSize.body,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
    marginBottom: spacing.xxl,
    paddingHorizontal: 50,
  },

  signupText: {
    color: colors.theme,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: fontSize.header,
    lineHeight: 35,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: borderWidth.sm,
    borderColor: colors.theme,
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },

  icon: {
    marginRight: spacing.sm,
  },

  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },

  button: {
    backgroundColor: colors.theme,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: "90%",
    alignItems: "center",
    marginTop: spacing.xxl,
  },

  loginText: {
    color: colors.theme,
    fontSize: fontSize.body,
    lineHeight: 35,
    fontWeight: "400",
    marginTop: spacing.lg,
  },
});
