import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/Notifications/NotificationBar";
import { h1 } from "../themes/theme";
import { StatusBar } from "expo-status-bar";

//AdMob
import AdMob from "../config/admob.json";
import { AdMobBanner } from "expo-ads-admob";
import { context } from "../config/config";

const { width } = Dimensions.get("screen");

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const { theme, Config } = useContext(context);
  const { key } = Config.user;

  function fetchNotifications(key: string) {
    var url =
      "https://www.speedrun.com/api/v1/notifications?max=" +
      Config.notifications.max;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Host", "www.speedrun.com");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-API-Key", key);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        setNotifications(response.data);
      }
    };
    xhr.send();
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications(key);
    }, [])
  );
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.profile}>
        <UserHeader />
      </View>
      <NotificationBar width={width} data={notifications} />
      <Text
        style={[
          h1,
          { marginLeft: 20, fontWeight: "bold", color: theme.colors.text },
        ]}
      >
        My Games
      </Text>
      <MyGames />
      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={AdMob.home}
        servePersonalizedAds
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    height: 250,
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
    margin: 20,

    justifyContent: "space-between",
  },
  notifications: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
