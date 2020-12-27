import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/Notifications/NotificationBar";
import { colors, h1 } from "../themes/theme";
import { StatusBar } from "expo-status-bar";

import { AdMobBanner } from "expo-ads-admob";
import { context } from "../config/config";

const { width } = Dimensions.get("screen");

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [games, setGames] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { theme } = useContext(context);

  function fetchNotifications(key: string) {
    var url = "https://www.speedrun.com/api/v1/notifications";
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
  async function fetchData() {
    const key = await AsyncStorage.getItem("@API-Key");
    const GAMES = await AsyncStorage.getItem("@MyGames");
    const username = await AsyncStorage.getItem("@user");
    const userid = await AsyncStorage.getItem("@userid");
    setGames(JSON.parse(GAMES === null ? "[]" : GAMES));
    setUsername(username === null ? "" : username);
    setUserid(userid === null ? "" : userid);
    fetchNotifications(key === null ? "" : key);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.profile}>
        <UserHeader username={username} userid={userid} />
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
      <MyGames data={games} />
      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3552758561036628/7487974176"
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
