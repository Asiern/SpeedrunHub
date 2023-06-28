import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useConfig } from "../../../hooks";
import Checkbox from "expo-checkbox";
import crashlytics from "@react-native-firebase/crashlytics";

interface ICrashData {
  width: number;
}

export default function CrashData({ width }: ICrashData): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;

  async function toggleCrashlytics() {
    try {
      crashlytics().log("Crash data toggle crashlytics function called");
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
    } catch (e) {
      console.log(e);
      crashlytics().recordError(e);
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.subHeader, { color: theme.colors.headerText }]}>
        Share Crash Data
      </Text>
      <Text
        style={[
          styles.text,
          { color: theme.colors.text, textAlign: "justify" },
        ]}
      >
        We prioritize your privacy and are committed to providing a secure app
        experience. To enhance app stability and address any potential issues,
        we kindly ask for your consent to share crash data. Rest assured that
        all data collected is treated with strict confidentiality. Your
        participation helps us identify and resolve crashes, ensuring a smooth
        and reliable app for all users. Thank you for contributing to our
        continuous improvement efforts while maintaining your privacy.
      </Text>
      <View style={styles.checkBoxView}>
        <Checkbox
          accessible
          accessibilityLabel="Crash data toggle"
          accessibilityHint="Toggles crash data sharing"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: config.google.crashlyticsEnabled }}
          value={config.google.crashlyticsEnabled}
          onValueChange={toggleCrashlytics}
          color={
            config.google.crashlyticsEnabled ? theme.colors.primary : undefined
          }
        />
        <Text
          accessible
          accessibilityLabel="Crash data toggle"
          accessibilityHint="Toggles crash data sharing"
          accessibilityRole="checkbox"
          onPress={toggleCrashlytics}
          style={[
            styles.text,
            { color: theme.colors.text, marginLeft: 5, textAlign: "justify" },
          ]}
        >
          You can change your privacy settings at any time by going to Settings.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
