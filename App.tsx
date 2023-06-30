import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import crashlytics from "@react-native-firebase/crashlytics";
import { version } from "./package.json";

// Translations (i18n)
import "./app/locale/i18n";

// TODO Migrate from expo-app-loading to expo-splash-screen
import AppLoading from "expo-app-loading";

// Fonts
import { loadAsync } from "expo-font";

// Splash screen
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

//Screens
import Navigation from "./app/navigation/Navigation";
import { context, defaultConfig } from "./app/config/config";
import { StatusBar } from "expo-status-bar";
import { config } from "./app/types";

export default function App(): JSX.Element {
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
      crashlytics().log("AppLoading");
      await SplashScreen.preventAutoHideAsync();
      await loadAsync({
        Poppins: require("./app/assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./app/assets/fonts/Poppins-Medium.ttf"),
      });
      crashlytics().log("AppLoading: Fonts loaded");

      // Read config from AsyncStorage
      let CONFIG: string | null = await AsyncStorage.getItem("@Config");
      crashlytics().log("AppLoading: Config loaded");

      // Config null => load default config
      if (CONFIG === null) {
        crashlytics().log("AppLoading: Config null => load default config");
        await AsyncStorage.setItem(
          "@Config",
          JSON.stringify({ ...config, version })
        );
      }

      // Read config from storage
      CONFIG = await AsyncStorage.getItem("@Config");
      crashlytics().log("AppLoading: Config loaded from storage");
      const confObj: config = CONFIG ? JSON.parse(CONFIG) : config;

      // Check if config version is outdated and update it
      if (confObj.version !== version) {
        crashlytics().log("AppLoading: Config version outdated");
        confObj.version = version;
        // Check if new version is compatible with old config
        if (confObj.theme === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.theme = defaultConfig.theme;
        }
        if (confObj.google === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.google = defaultConfig.google;
        }
        if (confObj.accepted === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.accepted = defaultConfig.accepted;
        }
        if (confObj.notifications === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.notifications = defaultConfig.notifications;
        }
        if (confObj.logged === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.logged = defaultConfig.logged;
        }
        if (confObj.onboarding === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.onboarding = defaultConfig.onboarding;
        }
        if (confObj.user === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.user = defaultConfig.user;
        }
        if (confObj.key === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.key = defaultConfig.key;
        }
        if (confObj.games === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.games = defaultConfig.games;
        }
        if (confObj.following === undefined) {
          crashlytics().log("AppLoading: Config version outdated");
          confObj.following = defaultConfig.following;
        }
      }

      // Update config state
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
      crashlytics().recordError(e);
      console.warn(e);
    } finally {
      crashlytics().log("AppLoading finished");
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  const handleLoadingError = (error) => {
    crashlytics().recordError(error);
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
