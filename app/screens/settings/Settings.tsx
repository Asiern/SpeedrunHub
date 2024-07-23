import React from "react";
import { Linking, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Header } from "../../components";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";
import crashlytics from "@react-native-firebase/crashlytics";
import { useTranslation } from "react-i18next";

type section = {
  title: string;
  icon: string;
  navigateTo: string | null;
  weblink: string | null;
  onPress: (() => void) | null;
};

const Sections: section[] = [
  {
    title: "notifications",
    icon: "bell",
    navigateTo: "NotificationsSettings",
    onPress: null,
    weblink: null,
  },
  // {
  //   title: "Themes",
  //   icon: "droplet",
  //   navigateTo: "Themes",
  //   weblink: null,
  // },
  {
    title: "about",
    icon: "info",
    navigateTo: "About",
    onPress: null,
    weblink: null,
  },
  {
    title: "privacy-safety",
    icon: "shield",
    navigateTo: "Safety",
    onPress: null,
    weblink: null,
  },
  {
    title: "privacy-policy",
    icon: "book-open",
    navigateTo: null,
    weblink:
      "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Privacy%20Policy.md",
    onPress: null,
  },
  {
    title: "terms-service",
    icon: "book",
    navigateTo: null,
    weblink:
      "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Terms%20%26%20Conditions.md",
    onPress: null,
  },
];

export function Settings(): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;

  const { t } = useTranslation();

  const navigation = useNavigation();
  crashlytics().log("Settings screen Mounted");

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Header title={t("settings")} />
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        {Sections.map(({ icon, navigateTo, title, weblink }, index: number) => {
          return (
            <View key={index} style={{ marginTop: 10 }}>
              <Button
                icon={icon}
                label={t(title)}
                onPress={() => {
                  if (navigateTo) navigation.navigate(navigateTo);
                  else if (weblink) Linking.openURL(weblink);
                }}
                shadow
              />
            </View>
          );
        })}
        <View style={{ marginVertical: 10 }}>
          <Button
            icon={"log-out"}
            label={t("logout")}
            onPress={() => {
              setConfig({ ...config, logged: false, key: null, user: null });
              navigation.navigate("Login");
            }}
            shadow
          />
        </View>
      </View>
    </ScrollView>
  );
}
