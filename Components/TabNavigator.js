import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LearnScreen from '../Screens/LearnScreen'
import ExploreScreen from '../Screens/ExploreScreen'
import NotebookScreen from '../Screens/NotebookScreen'
import AccountScreen from '../Screens/AccountScreen'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={(route) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Learn') {
            return <Entypo name="chat" size={24} color= {color} />
          } else if (route.name === 'Notebook') {
            return <MaterialCommunityIcons name="notebook-edit" size={24} color={color} />
          } else if (route.name === 'Explore') {
            return <FontAwesome5 name="map-marked-alt" size={24} color={color} />
          } else if (route.name === 'Account') {
            return <MaterialIcons name="account-circle" size={24} color={color} />
          }
        },

        tabBarActiveTintColor: '#63AE8D',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: 'white'},
        headerStyle: {backgroundColor: '#63AE8D'},
        headerTintColor: 'white',
      })}
    >
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Notebook" component={NotebookScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})