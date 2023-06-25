import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";
import crashlytics from "@react-native-firebase/crashlytics";
import CheckBox from "expo-checkbox";

type option = {
  enabledTitle: string;
  enabledDescription: string;
  disabledTitle: string;
  disabledDescription: string;
};

const options = {
  crashlytics: {
    enabledTitle: "Disable data collection for Firebase Crashlytics",
    enabledDescription:
      "If you prefer not to share crash reports and error logs, you can disable data collection for Firebase Crashlytics. However, please note that this may limit our ability to identify and resolve app issues effectively.",
    disabledTitle:
      "Enable data collection for Firebase Crashlytics (recommended)",
    disabledDescription:
      "By enabling data collection, you allow us to receive crash reports and error logs anonymously, helping us identify and fix issues to provide a better app experience. No personal information is collected.",
  },
};

export function Safety(): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!config.google.crashlyticsEnabled)
      .then(() =>
        setConfig({
          ...config,
          google: {
            ...config.google,
            crashlyticsEnabled: !config.google.crashlyticsEnabled,
          },
        })
      );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Privacy & Safety" />
      <View style={{ paddingHorizontal: 30 }}>
        <Text style={[styles.header, { color: theme.colors.headerText }]}>
          Data Collection Preferences
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Manage Your Privacy Settings
        </Text>
        <View
          style={[
            { flexDirection: "row", alignItems: "flex-start", marginTop: 20 },
          ]}
        >
          <CheckBox
            style={styles.checkbox}
            value={config.google.crashlyticsEnabled}
            onValueChange={toggleCrashlytics}
            color={
              config.google.crashlyticsEnabled
                ? theme.colors.primary
                : undefined
            }
          />
          <Text
            style={[
              styles.title,
              { color: theme.colors.headerText, marginLeft: 5 },
            ]}
            numberOfLines={2}
          >
            {config.google.crashlyticsEnabled
              ? options.crashlytics.enabledTitle
              : options.crashlytics.disabledTitle}
          </Text>
        </View>
        <Text style={[styles.info, { color: theme.colors.text }]}>
          {config.google.crashlyticsEnabled
            ? options.crashlytics.enabledDescription
            : options.crashlytics.disabledDescription}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.header, { color: theme.colors.headerText }]}>
            Privacy Information
          </Text>
          <Text style={[styles.info, { color: theme.colors.text }]}>
            We take your privacy seriously. The data collected by Firebase
            Crashlytics is used solely for the purpose of improving app
            stability and fixing bugs. No personally identifiable information is
            captured or shared. You can learn more about our data collection
            practices and how we handle your information in our Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  header: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: "Poppins",
    fontSize: 15,
  },
  info: {
    fontFamily: "Poppins",
    fontSize: 10,
  },
  checkbox: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
});
