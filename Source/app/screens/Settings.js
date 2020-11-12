import React from "react";

import SettingsSection from "../components/SettingsSection";

import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

export default function Settings(props) {
  const theme = useSelector((state) => state.themeReducer.theme);

  const DATA = [
    {
      title: "My Account",
      icon: "user",
      navigateTo: "AccountSettings",
    },
    {
      title: "Unlock Pro Version",
      icon: "unlock",
      navigateTo: "About",
    },
    {
      title: "About",
      icon: "info",
      navigateTo: "About",
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
          backgroundColor={theme.PRIMARY_BACKGROUND}
          accentColor={theme.PRIMARY_ACCENT}
          textPrimaryColor={theme.PRIMARY_TEXT}
          navigation={props.navigation}
        />
      )}
      keyExtractor={(item, index) => "key" + index}
    ></FlatList>
  );
}
