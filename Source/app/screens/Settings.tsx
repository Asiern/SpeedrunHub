import React, { useContext } from "react";
import SettingsSection from "../components/SettingsSection";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { context } from "../config/config";

export default function Settings() {
  const { theme } = useContext(context);
  const Sections = [
    {
      title: "My Account",
      icon: "user",
      navigateTo: "AccountSettings",
      weblink: null,
    },
    {
      title: "Notifications",
      icon: "bell",
      navigateTo: "NotificationsSettings",
      weblink: null,
    },
    {
      title: "Themes",
      icon: "droplet",
      navigateTo: "Themes",
      weblink: null,
    },
    {
      title: "About",
      icon: "info",
      navigateTo: "About",
      weblink: null,
    },
    {
      title: "Privacy Policy",
      icon: "book-open",
      navigateTo: null,
      weblink:
        "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Privacy%20Policy.md",
    },
    {
      title: "Terms & Conditions",
      icon: "book",
      navigateTo: null,
      weblink:
        "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Terms%20%26%20Conditions.md",
    },
  ];
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style={theme.dark ? "light" : "dark"}></StatusBar>
      <>
        {Sections.map((section, index) => {
          return (
            <SettingsSection
              key={index}
              navigateTO={section.navigateTo}
              title={section.title}
              icon={section.icon}
              backgroundColor={theme.colors.card}
              accentColor={theme.colors.primary}
              textPrimaryColor={theme.colors.text}
              weblink={section.weblink}
            />
          );
        })}
      </>
    </ScrollView>
  );
}
