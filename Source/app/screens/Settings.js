import React from "react";

import SettingsSection from "../components/SettingsSection";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";

export default function Settings(props) {
  const DATA = [
    {
      title: "My Account",
      icon: "user",
      navigateTo: "AccountSettings",
      weblink: null,
    },
    // {
    //   title: "Notifications",
    //   icon: "bell",
    //   navigateTo: "NotificationsSettings",
    // },
    {
      title: "Unlock Pro Version",
      icon: "unlock",
      navigateTo: null,
      weblink: "https://play.google.com/store",
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
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <SettingsSection
          navigateTO={item.navigateTo}
          title={item.title}
          icon={item.icon}
          backgroundColor={colors.white}
          accentColor={colors.primary}
          textPrimaryColor={colors.darkgrey}
          navigation={props.navigation}
          weblink={item.weblink}
        />
      )}
      keyExtractor={(item, index) => "key" + index}
    ></FlatList>
  );
}
