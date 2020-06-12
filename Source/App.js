import Home from "./app/screens/Home";
import Search from "./app/screens/Search";
import Test from "./app/screens/test";
import color from "./app/config/colors";

import * as React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

//SCROLL
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function HomeScreen() {
  return <Home />;
}
function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Account</Text>
    </View>
  );
}

function SearchScreen() {
  return <Search />;
}

function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Test />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            } else if (route.name === "Search") {
              iconName = focused ? "ios-search" : "ios-search";
            } else if (route.name === "Account") {
              iconName = focused ? "ios-list-box" : "ios-list-box";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: color.primary,
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
