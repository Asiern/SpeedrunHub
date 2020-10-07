import React from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Text } from "react-native-paper";

import colors from "../config/colors";
import Feather from "@expo/vector-icons/Feather";

import SettingsSection from "../components/SettingsSection";

import styled, { ThemeProvider } from "styled-components";
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
      title: "Notifications",
      icon: "bell",
      navigateTo: "NotificationSettings",
    },
    {
      title: "Themes",
      icon: "droplet",
      navigateTo: "Themes",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Container>
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
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.SECONDARY_BACKGROUND};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
  },
  buttons: {
    flex: 1,
    backgroundColor: colors.light,
  },
  button: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  textcontainer: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  h2: {},
});
