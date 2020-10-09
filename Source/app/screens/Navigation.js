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

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Feather from "@expo/vector-icons/Feather";

import { theme } from "../config/Themes";
import styled, { ThemeProvider } from "styled-components";

const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
HomeStack = (props) => {
  return (
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
    </Stack.Navigator>
  );
};
SearchStack = (props) => {
  return (
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
};
SettingsStack = (props) => {
  return (
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
};
export default function Navigation() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <NavigationContainer>
          <BottomTabs.Navigator
            initialRouteName="Home"
            activeColor={theme.PRIMARY_ACCENT}
            inactiveColor={theme.INACTIVE}
            barStyle={{ backgroundColor: theme.PRIMARY_BACKGROUND }}
          >
            <BottomTabs.Screen
              name="Home"
              children={() => HomeStack()}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <Feather name="home" color={color} size={24} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="Search"
              component={() => SearchStack()}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => (
                  <Feather name="search" color={color} size={24} />
                ),
              }}
            />

            <BottomTabs.Screen
              name="Settings"
              component={() => SettingsStack()}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color }) => (
                  <Feather name="settings" color={color} size={24} />
                ),
              }}
            />
          </BottomTabs.Navigator>
        </NavigationContainer>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.SECONDARY_BACKGROUND};
`;
