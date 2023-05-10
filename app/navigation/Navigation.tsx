import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";

//Screens
import { Login } from "../screens/login";
import OnboardingScreen from "../screens/Onboarding";

//Stacks
const Root = createStackNavigator();

interface NavigationProps {
  initialRoute: string;
}

function Navigation({ initialRoute }: NavigationProps): JSX.Element {
  return (
    <NavigationContainer>
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
