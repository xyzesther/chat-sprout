import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LearnScreen from "../Screens/LearnScreen";
import ExploreScreen from "../Screens/ExploreScreen";
import NotebookScreen from "../Screens/NotebookScreen";
import AccountScreen from "../Screens/AccountScreen";
import ThoughtsScreen from "../Screens/ThoughtsScreen";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, image, fontSize, spacing } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ setIsUserLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Learn") {
            return <Entypo name="chat" size={image.iconImg} color={color} />;
          } else if (route.name === "Notebook") {
            return (
              <MaterialCommunityIcons
                name="notebook-edit"
                size={image.iconImg}
                color={color}
              />
            );
          } else if (route.name === "Explore") {
            return (
              <FontAwesome5
                name="map-marked-alt"
                size={image.iconImg}
                color={color}
              />
            );
          } else if (route.name === "Account") {
            return (
              <MaterialIcons
                name="account-circle"
                size={image.iconImg}
                color={color}
              />
            );
          } else if (route.name === "Thoughts") {
            return (
              <Ionicons
                name="sparkles-outline"
                size={image.iconImg}
                color={color}
              />
            );
          }
        },

        tabBarActiveTintColor: colors.theme,
        tabBarInactiveTintColor: colors.disabled,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: { backgroundColor: colors.theme },
        headerTintColor: colors.text.primary,
      })}
    >
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Notebook" component={NotebookScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Thoughts" component={ThoughtsScreen} />
      <Tab.Screen
        name="Account"
        children={() => <AccountScreen setIsUserLoggedIn={setIsUserLoggedIn} />}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: fontSize.tab,
  },
  tabBar: {
    backgroundColor: colors.background.white,
    padding: spacing.md,
  },
});
