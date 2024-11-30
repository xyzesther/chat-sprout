import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./Components/TabNavigator";
import AddNoteScreen from "./Screens/AddNoteScreen";
import { colors } from "./styles/styles";
import { createTamagui, TamaguiProvider } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
import ConversationScreen from "./Screens/ConversationScreen";
import { PortalProvider } from "@tamagui/portal";
// import { ToastProvider } from '@tamagui/toast';
import Toast from "react-native-toast-message";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useEffect, useState } from "react";

const config = createTamagui(defaultConfig);

const Stack = createNativeStackNavigator();
const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="BottomTabNavigator"
      component={TabNavigator}
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
      options={({ navigation, route }) => ({
        title: route.params?.title || "Conversation",
        headerBackTitleVisible: false,
      })}
    />
  </>
);

export default function App() {
  const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false);
  useEffect(() => {
    //set up auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("listener ", user);
      // if user is not logged in we receive null
      // else we receive user data
      if (user) {
        SetIsUserLoggedIn(true);
      } else {
        SetIsUserLoggedIn(false);
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
