import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { colors } from "../themes/theme";
import { Feather } from "@expo/vector-icons";

//Screens
import Home from "../screens/Home";
import SETTINGS from "../screens/Settings";
import Profile from "../screens/Profile";
import GameInfo from "../screens/GameInfo";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import RunInfo from "../screens/RunInfo";
import {
  DevSettings,
  About,
  AccountSettings,
  NotificationsSettings,
  ThemeSettings,
} from "../screens/Settings/index";
import { context } from "../config/config";

//Stacks
const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Game Info"
      component={GameInfo}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Settings" component={SETTINGS} />
    <Stack.Screen
      name="RunInfo"
      component={RunInfo}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
const createSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SETTINGS} />
    <Stack.Screen
      name="AccountSettings"
      component={AccountSettings}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="DevSettings" component={DevSettings} />
    <Stack.Screen
      name="NotificationsSettings"
      component={NotificationsSettings}
      options={{ title: "Notifications" }}
    />
    <Stack.Screen name="Themes" component={ThemeSettings} />
  </Stack.Navigator>
);
const createSearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={Search}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Game Info"
      component={GameInfo}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RunInfo"
      component={RunInfo}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
function MainNavigator() {
  const { theme } = React.useContext(context);
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.text}
      shifting
      barStyle={{
        backgroundColor: theme.colors.card,
      }}
    >
      <BottomTabs.Screen
        name="Home"
        children={createHomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={24} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={createSearchStack}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={24} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Settings"
        component={createSettingsStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={24} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default MainNavigator;
