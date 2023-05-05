import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO Migrate from expo-app-loading to expo-splash-screen
import AppLoading from "expo-app-loading";

// Fonts
import { loadAsync, useFonts } from "expo-font";

// Splash screen
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

//Screens
import Navigation from "./app/navigation/Navigation";
import { context, defaultConfig } from "./app/config/config";
import { StatusBar } from "expo-status-bar";
import { config } from "./app/types";

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [initialRoute, setInitialRoute] = useState("Onboarding");
  const [config, setConfig] = useState<config>(defaultConfig);

  /**
   * Update config state and async storage values
   * @param config config object
   */
  async function updateConfig(config: config) {
    await AsyncStorage.setItem("@Config", JSON.stringify(config));
    setConfig({ ...config });
  }

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) await SplashScreen.hideAsync();
  // }, [appIsReady]);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await loadAsync({
        Poppins: require("./app/assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./app/assets/fonts/Poppins-Medium.ttf"),
      });

      // Read config from AsyncStorage
      let CONFIG: string | null = await AsyncStorage.getItem("@Config");

      // Config null => load default config
      if (CONFIG === null)
        await AsyncStorage.setItem("@Config", JSON.stringify(config));

      // Read config from storage
      CONFIG = await AsyncStorage.getItem("@Config");
      const confObj: config = JSON.parse(CONFIG!);
      setConfig(confObj);

      // Set initial route
      if (confObj.onboarding !== true) {
        setInitialRoute("Onboarding");
      } else if (confObj.logged !== true) {
        setInitialRoute("Login");
      } else {
        setInitialRoute("Main");
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  const handleLoadingError = (error) => {
    console.warn(error);
  };

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={prepare}
        onError={handleLoadingError}
        onFinish={() => setAppIsReady(true)}
      />
    );
  }

  return (
    <>
      <StatusBar
        style={"dark"}
        backgroundColor={config.theme.colors.background}
      />
      <context.Provider value={{ config, setConfig: updateConfig }}>
        <Navigation initialRoute={initialRoute} />
      </context.Provider>
    </>
  );
}
