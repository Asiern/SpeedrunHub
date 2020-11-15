import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";

//Screens
import Login from "../screens/Login";

//Stacks
const Root = createStackNavigator();

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
