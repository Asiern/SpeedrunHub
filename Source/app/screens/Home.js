import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/Notifications/NotificationBar";
import colors from "../config/colors";
import { h1 } from "../themes/Styles";

import { AdMobBanner } from "expo-ads-admob";

const { width } = Dimensions.get("screen");

export default function Home(props) {
  const navigation = useNavigation();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [games, setGames] = useState([]);
  const [notifications, setNotifications] = useState(null);

  function fetchNotifications(key) {
    var url = "https://www.speedrun.com/api/v1/notifications";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Host", "www.speedrun.com");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-API-Key", key);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        response = JSON.parse(xhr.responseText);
        setNotifications(response.data);
      }
    };
    xhr.send();
  }
  async function fetchData() {
    const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
    const key = await AsyncStorage.getItem("@API-Key");
    const GAMES = await AsyncStorage.getItem("@MyGames");
    const username = await AsyncStorage.getItem("@user");
    const userid = await AsyncStorage.getItem("@userid");
    LOGGEDIN == "true"
      ? null
      : navigation.navigate("Login", { screen: "Login" });
    setGames(JSON.parse(GAMES));
    setUsername(username);
    setUserid(userid);
    fetchNotifications(key);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <UserHeader
            username={username}
            userid={userid}
            navigation={navigation}
          />
        </View>
        <NotificationBar
          width={width}
          APIKey={props.APIKey}
          navigation={navigation}
          data={notifications}
        />
        <Text style={[h1, { marginLeft: 20 }]}>My Games</Text>
        <MyGames data={games} navigation={navigation} />
        {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3552758561036628/7487974176"
          servePersonalizedAds
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
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
