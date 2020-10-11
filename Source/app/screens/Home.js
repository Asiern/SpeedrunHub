import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/NotificationBar";
import colors from "../config/colors";

const { width } = Dimensions.get("screen");

export default function Home(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const navigation = useNavigation();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [games, setGames] = useState([]);
  const [notifications,setNotifications]= useState(null);
  const [APIKey,setAPIKey] = useState(props.APIKey);
 
  function fetchNotifications(){
    var url = "https://www.speedrun.com/api/v1/notifications";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Host", "www.speedrun.com");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-API-Key", APIKey);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            response = JSON.parse(xhr.responseText);
            setNotifications(response.data);
          }
        };
        xhr.send();
  }
  async function fetchData() {
    fetchNotifications();
    const GAMES = await AsyncStorage.getItem("@MyGames");
    const username = await AsyncStorage.getItem("@user");
    const userid = await AsyncStorage.getItem("@userid");
    const key = await AsyncStorage.getItem("@API-Key");
    setAPIKey(key);
    setGames(JSON.parse(GAMES));
    setUsername(username);
    setUserid(userid);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.SECONDARY_BACKGROUND }}
        >
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
            <Text style={styles.headertext}>My Games</Text>
              <MyGames data={games} navigation={navigation} />
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
