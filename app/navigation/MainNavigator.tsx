import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Home from "../screens/home/Home";
import { Settings } from "../screens/settings";
import GameInfo from "../screens/GameInfo";
import Search from "../screens/search/Search";
import Notifications from "../screens/Notifications";
import RunInfo from "../screens/RunInfo";
import { About, NotificationsSettings } from "../screens/settings";
import { Profile } from "../screens/profile/Profile";
import { user } from "../hooks/types";

const Stack = createStackNavigator();

type GameInfoParams = {
  id: string;
  abbreviation: string;
};
type ProfileParams = {
  user: user;
};
type RunInfoParams = {
  weblink: string;
};
type SearchParams = {
  query: string;
};

export type MainNavigatorParamList = {
  GameInfo: GameInfoParams;
  Profile: ProfileParams;
  RunInfo: RunInfoParams;
  Search: SearchParams;
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="GameInfo"
      component={GameInfo}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="About"
      component={About}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NotificationsSettings"
      component={NotificationsSettings}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RunInfo"
      component={RunInfo}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Search"
      component={Search}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeStack;
