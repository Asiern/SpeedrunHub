import React from "react";
import { Linking, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Header } from "../../components";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";

type section = {
  title: string;
  icon: string;
  navigateTo: string | null;
  weblink: string | null;
  onPress: (() => void) | null;
};

const Sections: section[] = [
  {
    title: "Notifications",
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
    title: "About",
    icon: "info",
    navigateTo: "About",
    onPress: null,
    weblink: null,
  },
  {
    title: "Privacy Policy",
    icon: "book-open",
    navigateTo: null,
    weblink:
      "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Privacy%20Policy.md",
    onPress: null,
  },
  {
    title: "Terms & Conditions",
    icon: "book",
    navigateTo: null,
    weblink:
      "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Terms%20%26%20Conditions.md",
    onPress: null,
  },
];

export function Settings(): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Header title="Settings" />
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
                label={title}
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
            label={"Log out"}
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
