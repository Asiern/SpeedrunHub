import React from "react";
import SettingsSection from "../components/SettingsSection";
import { colors } from "../themes/theme";
import { StatusBar } from "expo-status-bar";

export default function Settings() {
  const Sections = [
    {
      title: "My Account",
      icon: "user",
      navigateTo: "AccountSettings",
      weblink: null,
    },
    // {
    //   title: "Unlock Pro Version",
    //   icon: "unlock",
    //   navigateTo: null,
    //   weblink: "https://play.google.com/store",
    // },
    // {
    //   title: "About",
    //   icon: "info",
    //   navigateTo: "About",
    //   weblink: null,
    // },
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
    <>
      <StatusBar style={"dark"}></StatusBar>
      {Sections.map((section, index) => {
        return (
          <SettingsSection
            key={index}
            navigateTO={section.navigateTo}
            title={section.title}
            icon={section.icon}
            backgroundColor={colors.white}
            accentColor={colors.primary}
            textPrimaryColor={colors.darkgrey}
            weblink={section.weblink}
          />
        );
      })}
    </>
  );
}
