import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";

//Screens
import Navigation from "./app/Navigation/Navigation";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Onboarding");
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
        const ONBOARDING = await AsyncStorage.getItem("@Onboarding");
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
    return <Navigation initialRoute={initialRoute} />;
  }
}
