import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Linking, ScrollView, View, StyleSheet } from "react-native";
import { context } from "../../config/config";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Buttons/Button";
import { SquareButton } from "../../components/SquareButton";
import Constants from "expo-constants";

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

export function Settings() {
  const { config, setConfig } = useContext(context)!;
  const { theme } = config;
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View
        style={{
          paddingHorizontal: 30,
          marginTop: 10,
        }}
      >
        <SquareButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          variant="default"
        />
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
              setConfig({ ...config, logged: false });
              navigation.navigate("Login");
            }}
            shadow
          />
        </View>
      </View>
    </ScrollView>
  );
}
