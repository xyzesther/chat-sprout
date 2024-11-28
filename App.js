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
import Toast from 'react-native-toast-message';

const config = createTamagui(defaultConfig);

const Stack = createNativeStackNavigator();

export default function App() {
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
            </Stack.Navigator>
          </NavigationContainer>
        <Toast />
      </PortalProvider>
    </TamaguiProvider>
  );
}
