import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../config/Themes";

import GameCard from "../components/GameCard";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/NotificationBar";
import colors from "../config/colors";

import user from "../config/user.json";

const { width } = Dimensions.get("screen");

export default function Home(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [APIKey, setAPIKey] = useState("");
  //const [loading, setloading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const username = await AsyncStorage.getItem("@user");
      const userid = await AsyncStorage.getItem("@userid");
      const APIKey = await AsyncStorage.getItem("@API-Key");
      if (mounted) {
        setUsername(username);
        setUserid(userid);
        setAPIKey(APIKey);
        //setloading(false);
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <UserHeader
              username={username}
              userid={userid}
              navigation={props.navigation}
            />
          </View>
          <NotificationBar
            width={width}
            APIKey={APIKey}
            navigation={props.navigation}
          />
          <Text style={styles.headertext}>My Games (WIP)</Text>
          <View style={styles.flatList}>
            {user.games.map((game) => (
              <View key={game.id} style={styles.button}>
                <GameCard
                  navigation={props.navigation}
                  id={game.id}
                  abbreviation={game.abbreviation}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
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
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
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
