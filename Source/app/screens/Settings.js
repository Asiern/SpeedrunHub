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
    },
    // {
    //   title: "Notifications",
    //   icon: "bell",
    //   navigateTo: "NotificationsSettings",
    // },
    {
      title: "Unlock Pro Version",
      icon: "unlock",
      navigateTo: "Unlock",
    },
    {
      title: "About",
      icon: "info",
      navigateTo: "About",
    },
    {
      title: "Privacy Policy",
      icon: "book-open",
      navigateTo: "PrivacyPolicy",
    },
    {
      title: "Terms & Conditions",
      icon: "book",
      navigateTo: "TermsConditions",
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
        />
      )}
      keyExtractor={(item, index) => "key" + index}
    ></FlatList>
  );
}
