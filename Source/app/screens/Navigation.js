import React, { Component } from "react";

import Profile from "./Profile";
import Home from "./Home";
import Settings from "./Settings";
import About from "./Settings/About";
import GameInfo from "./GameInfo";
import Search from "./Search";
import Themes from "./Settings/Themes";
import MyGamesSettings from "./Settings/MyGamesSettings";
import Login from "./Login";
import Notifications from "./Notifications";
import NotificationsSettings from "./Settings/NotificationsSettings";
import AccountSettings from "./Settings/AccountSettings";
import RunInfo from "./RunInfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Feather from "@expo/vector-icons/Feather";
import colors from "../config/colors";

const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

export default class Navigation extends Component {
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
        name="RunInfo"
        component={RunInfo}
        options={{ title: "Run Info" }}
      />
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
      <Stack.Screen name="MyGamesSettings" component={MyGamesSettings} />
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
                <Feather name="home" color={color} size={24} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Search"
            component={this.createSearchStack}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color }) => (
                <Feather name="search" color={color} size={24} />
              ),
            }}
          />

          <BottomTabs.Screen
            name="Settings"
            component={this.createSettingsStack}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color }) => (
                <Feather name="settings" color={color} size={24} />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}
