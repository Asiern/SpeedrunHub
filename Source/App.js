import React, { Component } from "react";

import Profile from "./app/screens/Profile";
import Home from "./app/screens/Home";
import Settings from "./app/screens/Settings";
import About from "./app/screens/About";
import GameInfo from "./app/screens/GameInfo";
import Search from "./app/screens/Search";
import Themes from "./app/screens/Themes";
import MyGames from "./app/screens/MyGames";
import Login from "./app/screens/Login";
import Notifications from "./app/screens/Notifications";
import NotificationsSettings from "./app/screens/Settings/NotificationsSettings";
import AccountSettings from "./app/screens/Settings/AccountSettings";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "./app/config/colors";

const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

export default class App extends Component {
  createHomeStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: "" }}
      />
      <Stack.Screen name="Game Info" component={GameInfo} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: "" }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "My Profile", headerShown: "" }}
      />
      <Stack.Screen name="Themes" component={Themes} />
    </Stack.Navigator>
  );
  createSettingsStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "My Profile", headerShown: "" }}
      />
      <Stack.Screen name="Themes" component={Themes} />
      <Stack.Screen name="MyGames" component={MyGames} />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
        options={{ title: "Notifications Settings" }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
  createSearchStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search", headerShown: "" }}
      />
      <Stack.Screen name="Game Info" component={GameInfo} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile", headerShown: "" }}
      />
    </Stack.Navigator>
  );
  render() {
    if (false) {
      return <Login />;
    } else {
      return (
        <NavigationContainer>
          <BottomTabs.Navigator
            initialRouteName="Home"
            activeColor={colors.primary}
            inactiveColor={colors.darkgrey}
            barStyle={{ backgroundColor: colors.white }}
          >
            <BottomTabs.Screen
              name="Home"
              children={this.createHomeStack}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="md-home" color={color} size={26} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="Search"
              component={this.createSearchStack}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-search" color={color} size={26} />
                ),
              }}
            />

            <BottomTabs.Screen
              name="Settings"
              component={this.createSettingsStack}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-settings" color={color} size={26} />
                ),
              }}
            />
          </BottomTabs.Navigator>
        </NavigationContainer>
      );
    }
  }
}
