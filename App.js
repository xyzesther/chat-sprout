import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./Components/TabNavigator";
import AddNoteScreen from "./Screens/AddNoteScreen";
import { colors } from "./styles/styles";
import { createTamagui, TamaguiProvider } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
import ConversationScreen from "./Screens/ConversationScreen";
import { PortalProvider } from "@tamagui/portal";
import Toast from "react-native-toast-message";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import { useEffect, useState } from "react";

const config = createTamagui(defaultConfig);

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="BottomTabNavigator"
      children={() => <TabNavigator />}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddNote"
      component={AddNoteScreen}
      options={{
        headerBackTitleVisible: false,
        title: "Note",
      }}
    />
    <Stack.Screen
      name="ConversationScreen"
      component={ConversationScreen}
      options={({ route }) => ({
        title: route.params?.title || "Conversation",
        headerBackTitleVisible: false,
      })}
    />
  </>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Set up auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("listener ", user);
      // If user is not logged in we receive null
      // Else we receive user data
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TamaguiProvider config={config}>
      <PortalProvider shouldAddRootHost>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: colors.theme },
              headerTintColor: colors.text.primary,
            }}
          >
            {isUserLoggedIn ? AppStack : AuthStack}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PortalProvider>
    </TamaguiProvider>
  );
}