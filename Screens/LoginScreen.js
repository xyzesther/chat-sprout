import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { borderRadius, borderWidth, colors, fontSize, spacing } from "../styles/styles";
import { Button, Input, Sheet, XStack, YStack } from "tamagui";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const signupHandler = () => {
    navigation.replace("Signup");
  };

  const loginHandler = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        Alert.alert("Validation Error", "Email and password fields cannot be empty.");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("Login error:", err);
      Alert.alert("Login Failed", "Invalid email or password. Please try again.");
    }
  };

  async function resetPasswordHandler() {
    try {
      if (!resetEmail) {
        Alert.alert("Validation Error", "Please enter your email address.");
        return;
      }
      await sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          Alert.alert(
            "Password Reset Email Sent",
            "Check your inbox for further instructions."
          );
          setSheetOpen(false);
          setResetEmail("");
        })
        .catch((error) => {
          console.error("Reset Password error:", error);
          if (error.code === "auth/invalid-email") {
            Alert.alert("Error", "Invalid email address format.");
          } else if (error.code === "auth/user-not-found") {
            Alert.alert("Error", "No account found with this email.");
          } else {
            Alert.alert("Error", "An unknown error occurred. Please try again.");
          }
        });
      } catch (err) {
        console.error("Unexpected error:", err);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
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
      <Button onPress={loginHandler}>
        Login
      </Button>
      <Text
        style={styles.forgotPassword}
        onPress={() => setSheetOpen(true)}
      >
        Forgot Password?
      </Text>
      <Button onPress={signupHandler}>
        New User? Create An Account
      </Button>

      {/* Forgot Password Sheet */}
      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Frame padding="$4" borderRadius="$4">
          <Sheet.Handle />
          <YStack gap="$4">
            <Text style={styles.dialogTitle}>Reset Your Password</Text>
            <Input
              placeholder="Enter your registered email"
              value={resetEmail}
              onChangeText={setResetEmail}
              style={styles.dialogInput}
            />
            <XStack justifyContent="space-between" gap="$3">
              <Button
                onPress={() => {
                  setSheetOpen(false);
                  setResetEmail("");
                }}
                theme="secondary"
              >
                Cancel
              </Button>
              <Button 
                onPress={resetPasswordHandler} 
                theme="primary"
              >
                Send Reset Link
              </Button>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    padding: spacing.md,
  },

  input: {
    borderColor: "#552055",
    borderWidth: borderWidth.md,
    width: "90%",
    alignSelf: "center",
    margin: spacing.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },

  label: {
    marginLeft: spacing.md,
    fontSize: fontSize.body,
  },

  forgotPassword: {
    color: colors.text.secondary,
    textAlign: "center",
    marginVertical: spacing.md,
    textDecorationLine: "underline",
    fontSize: fontSize.body,
  },

  sheetTitle: {
    fontSize: fontSize.title,
    fontWeight: "bold",
    textAlign: "center",
  },

  sheetInput: {
    borderColor: colors.theme,
    borderWidth: borderWidth.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
  },
});
