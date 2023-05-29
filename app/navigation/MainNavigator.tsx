import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Home from "../screens/home/Home";
import { Settings } from "../screens/settings";
import { GameInfoContainer } from "../screens/game";
import Search from "../screens/search/Search";
import { NotificationsContainer } from "../screens/notifications";
import RunInfo from "../screens/RunInfo";
import { About, NotificationsSettings } from "../screens/settings";
import { user } from "../hooks/types";
import { Profile } from "../screens/profile";
import GameList from "../screens/GameList";
import Following from "../screens/Following";

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

function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameList"
        component={GameList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Following"
        component={Following}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameInfo"
        component={GameInfoContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsContainer}
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
}

export default HomeStack;
