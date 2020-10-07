import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/NotificationBar";
import NotificationCard from "../components/NotificationCard";
import colors from "../config/colors";

const { width } = Dimensions.get("screen");

export default function Home(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const navigation = useNavigation();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [APIKey, setAPIKey] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const username = await AsyncStorage.getItem("@user");
      const userid = await AsyncStorage.getItem("@userid");
      const APIKey = await AsyncStorage.getItem("@API-Key");
      const GAMES = await AsyncStorage.getItem("@MyGames");
      if (mounted) {
        setUsername(username);
        setUserid(userid);
        setAPIKey(APIKey);
        setGames(JSON.parse(GAMES));
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={theme} style={{ flex: 1 }}>
      <Container>
        <ScrollView style={{ flex: 1, backgroundColor: colors.light }}>
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
              APIKey={APIKey}
              navigation={navigation}
            />
            <Text style={styles.headertext}>My Games</Text>
            {games == null ? (
              <View>
                <NotificationCard
                  width={width}
                  text={
                    "Start searching for your favourite games and add them to MyGames."
                  }
                  backgroundColor={colors.green}
                  color={theme.PRIMARY_ACCENT}
                />
              </View>
            ) : (
              <MyGames data={games} navigation={navigation} />
            )}
          </View>
        </ScrollView>
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
