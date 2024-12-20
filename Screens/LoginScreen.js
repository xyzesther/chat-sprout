import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Dimensions } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { borderRadius, borderWidth, colors, fontSize, image, spacing } from "../styles/styles";
import { Button, Input, Label, Sheet, Text, XStack, YStack } from "tamagui";
import { Mail, Lock } from "@tamagui/lucide-icons";

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
      Alert.alert(
        "Password Reset Email Sent",
        "If the email you entered is registered, you'll receive an email with reset instructions."
      );
      setSheetOpen(false);
      setResetEmail("");
    } catch (err) {
      console.error("Error:", err);
      // Handle some specific errors
      switch (err.code) {
        case "auth/invalid-email":
          Alert.alert("Error", "The email address is not valid. Please try again.");
          break;
        case "auth/user-not-found":
          Alert.alert("Error", "No account found with this email address.");
          break;
        case "auth/too-many-requests":
          Alert.alert(
            "Error",
            "Too many requests. Please wait and try again later."
          );
          break;
        default:
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again later."
          );
          break;
      }
    }
  }

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
        Master small talk and networking – your guide to confident conversations!
      </Text>

      <Text style={styles.loginText}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Mail style={styles.icon} size={image.iconImg} color={colors.theme} />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
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
      <Text
        style={styles.forgotPassword}
        onPress={() => setSheetOpen(true)}
      >
        Forgot Password?
      </Text>
      <Button 
        onPress={loginHandler}
        style={styles.loginButton}
        textProps={{
          fontSize: fontSize.body,
          fontWeight: "bold",
          color: colors.text.primary,
        }}
      >
        Login
      </Button>
      <Text style={styles.signupText} onPress={signupHandler}>
        New User? Create An Account
      </Text>

      {/* Reset Password Sheet */}
      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[40]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame 
          paddingHorizontal="$4"
          paddingVertical="$6"
          backgroundColor={colors.background.white}
          borderTopLeftRadius={borderRadius.lg}
          borderTopRightRadius={borderRadius.lg}
        >
          <YStack gap="$4">
            <Text fontWeight="bold" fontSize="$4" textAlign="center">
              Reset Your Password
            </Text>

            <YStack gap="$2">
              <Label>Your Email Address</Label>
              <Input
                placeholder="Enter your registered email"
                value={resetEmail}
                onChangeText={setResetEmail}
              />
            </YStack>
            <XStack gap="$4" justifyContent="flex-end" marginTop="$4">
              <Button
                onPress={() => {
                  setSheetOpen(false);
                  setResetEmail("");
                }}
                theme="neutral"
                borderRadius="$4"
                size="$4"
              >
                Cancel
              </Button>
              <Button
                onPress={resetPasswordHandler} 
                theme="active"
                borderRadius="$4"
                size="$4"
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

  loginText: {
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

  forgotPassword: {
    color: colors.text.secondary,
    textAlign: "center",
    alignSelf: "flex-end",
    marginRight: spacing.lg,
    fontSize: fontSize.body,
    marginBottom: spacing.xxl,
    marginTop: spacing.md,
  },

  loginButton: {
    backgroundColor: colors.theme,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: "90%",
    alignItems: "center",
    marginTop: spacing.xxl,
  },

  signupText: {
    color: colors.theme,
    fontSize: fontSize.body,
    fontWeight: "400",
    lineHeight: 35,
    marginTop: spacing.lg,
  },
});
