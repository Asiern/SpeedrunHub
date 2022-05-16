import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import MainNavigator from "./MainNavigator";

//Screens
import Login from "../screens/Login";
import OnboardingScreen from "../screens/Onboarding";
import { context } from "../config/config";

//Stacks
const Root = createStackNavigator();

interface NavigationProps {
  initialRoute: string;
}

function Navigation({ initialRoute }: NavigationProps) {
  const { theme } = React.useContext(context);
  return (
    <NavigationContainer theme={theme}>
      <Root.Navigator initialRouteName={initialRoute}>
        <Root.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Root.Screen
          name="Onboarding"
          component={OnboardingScreen}
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
