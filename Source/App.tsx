import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";

//Themes
import { Theme } from "./app/themes/DefaultTheme";

//Screens
import Navigation from "./app/Navigation/Navigation";
import { context } from "./app/config/config";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Onboarding");
  const [theme, setTheme] = useState(Theme);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
        const ONBOARDING = await AsyncStorage.getItem("@Onboarding");
        const THEME = await AsyncStorage.getItem("@Theme");
        //Load Theme
        if (THEME === null) {
          await AsyncStorage.setItem("@Theme", JSON.stringify(theme));
        } else {
          setTheme(JSON.parse(THEME));
        }
        //Load Route
        var route = "";
        if (ONBOARDING !== "true") {
          route = "Onboarding";
        } else if (LOGGEDIN !== "true") {
          route = "Login";
        } else {
          route = "Main";
        }
        setInitialRoute(route);
        setLoading(false);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <context.Provider value={{ theme, setTheme }}>
        <Navigation initialRoute={initialRoute} />
      </context.Provider>
    );
  }
}
