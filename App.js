import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './Components/TabNavigator';
import AddNoteScreen from './Screens/AddNoteScreen';
import { colors } from './styles/styles';
import { createTamagui,TamaguiProvider } from 'tamagui'
import defaultConfig from '@tamagui/config/v3'

const config = createTamagui(defaultConfig)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: colors.theme},
            headerTintColor: colors.text.primary,
          }}
        >
          <Stack.Screen
            name="BottomTabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>

  );
}
