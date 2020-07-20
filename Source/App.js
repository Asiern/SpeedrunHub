import React, { Component } from "react";
import Profile from "./app/screens/Profile";
import Home from "./app/screens/Home";
import Settings from "./app/screens/Settings";
import GameInfo from "./app/screens/GameInfo";
import FollowedGames from "./app/screens/FollowedGames";
import Search from "./app/screens/Search";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "./app/config/colors";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default class App extends Component {
  createHomeStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: "" }}
      />
      <Stack.Screen name="Game Info" component={GameInfo} />
    </Stack.Navigator>
  );
  createProfileStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile", headerShown: "" }}
      />
      <Stack.Screen name="Game Info" component={GameInfo} />
    </Stack.Navigator>
  );
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Profile") {
                iconName = focused ? "md-contact" : "md-contact";
              } else if (route.name === "Settings") {
                iconName = focused ? "md-options" : "md-options";
              } else if (route.name === "Home") {
                iconName = focused ? "md-home" : "md-home";
              } else if (route.name === "Search") {
                iconName = focused ? "md-search" : "md-search";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.Crystalline1,
            inactiveTintColor: colors.darkgrey,
          }}
        >
          <BottomTabs.Screen name="Home" children={this.createHomeStack} />
          <BottomTabs.Screen
            name="Profile"
            children={this.createProfileStack}
          />
          <BottomTabs.Screen name="Search" component={Search} />
          <BottomTabs.Screen name="Settings" component={GameInfo} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}
