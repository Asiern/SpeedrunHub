import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import colors from "../config/colors";
import Feather from "@expo/vector-icons/Feather";

//Screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import SETTINGS from "../screens/Settings";
import Profile from "../screens/Profile";
import About from "../screens/Settings/About";
import GameInfo from "../screens/GameInfo";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import NotificationsSettings from "../screens/Settings/NotificationsSettings";
import AccountSettings from "../screens/Settings/AccountSettings";
import RunInfo from "../screens/RunInfo";

//Stacks
const Root = createStackNavigator();
const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

const createHomeStack = (props) => (
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
      options={{ title: "Run Info" }}
    />
  </Stack.Navigator>
);
const createSettingsStack = (props) => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SETTINGS} />
    <Stack.Screen
      name="NotificationsSettings"
      component={NotificationsSettings}
      options={{ title: "Notifications Settings" }}
    />
    <Stack.Screen
      name="AccountSettings"
      component={AccountSettings}
      options={{ title: "My Account" }}
    />
    <Stack.Screen name="About" component={About} />
  </Stack.Navigator>
);
const createSearchStack = (props) => (
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
      options={{ title: "Run Info" }}
    />
  </Stack.Navigator>
);
function MainNavigator() {
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      activeColor={colors.primary}
      inactiveColor={colors.darkgrey}
      barStyle={{ backgroundColor: colors.white }}
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

function Navigation() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Root.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
