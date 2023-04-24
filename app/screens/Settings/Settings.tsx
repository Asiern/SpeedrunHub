import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Linking, ScrollView, View } from "react-native";
import { context } from "../../config/config";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Buttons/Button";

type section = {
  title: string;
  icon: string;
  navigateTo: string | null;
  weblink: string | null;
  onPress: (() => void) | null;
};

const Sections: section[] = [
  {
    title: "My Account",
    icon: "user",
    navigateTo: "AccountSettings",
    weblink: null,
    onPress: null,
  },
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
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style={theme.dark ? "light" : "dark"}></StatusBar>
      <View style={{ padding: 30 }}>
        {Sections.map(({ icon, navigateTo, title, weblink }, index: number) => {
          return (
            <Button
              icon={icon}
              label={title}
              onPress={() => {
                if (weblink === null) navigation.navigate(navigateTo);
                else Linking.openURL(weblink);
              }}
              shadow
              key={index}
            />
          );
        })}
        <Button
          icon={"user-x"}
          label={"Log out"}
          onPress={() => {
            setConfig({ ...config, logged: false });
            navigation.navigate("Login");
          }}
          shadow
        />
      </View>
    </ScrollView>
  );
}
