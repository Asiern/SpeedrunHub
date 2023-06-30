import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";
import crashlytics from "@react-native-firebase/crashlytics";
import CheckBox from "expo-checkbox";
import { useTranslation } from "react-i18next";
import Divider from "../../components/Divider";

const options = {
  crashlytics: {
    enabledTitle: "disable-data-collection",
    enabledDescription: "disable-data-collection-description",
    disabledTitle: "enable-data-collection",
    disabledDescription: "enable-data-collection-description",
  },
};

export function Safety(): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const { t } = useTranslation();

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
      <Header title={t("privacy-safety")} />
      <View style={{ paddingHorizontal: 30 }}>
        <Text style={[styles.header, { color: theme.colors.headerText }]}>
          {t("screens.settings.privacy.preferences")}
        </Text>
        <Text style={[styles.info, { color: theme.colors.text }]}>
          {config.google.crashlyticsEnabled
            ? t(options.crashlytics.enabledDescription, { ns: "validation" })
            : t(options.crashlytics.disabledDescription, { ns: "validation" })}
        </Text>
        <View
          style={[
            { flexDirection: "row", alignItems: "center", marginTop: 10 },
          ]}
        >
          <CheckBox
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
              {
                color: theme.colors.headerText,
                marginLeft: 5,
                textAlignVertical: "center",
              },
            ]}
            numberOfLines={2}
          >
            {config.google.crashlyticsEnabled
              ? t(options.crashlytics.enabledTitle, { ns: "validation" })
              : t(options.crashlytics.disabledTitle, { ns: "validation" })}
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Divider />
        </View>
        <View>
          <Text style={[styles.header, { color: theme.colors.headerText }]}>
            {t("screens.settings.privacy.information")}
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
