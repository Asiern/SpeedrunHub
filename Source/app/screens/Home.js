import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/Notifications/NotificationBar";
import colors from "../config/colors";
import { h1 } from "../themes/Styles"

const { width } = Dimensions.get("screen");
async function getKey(){
  return await AsyncStorage.getItem("@API-Key");
}
export default function Home(props) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const navigation = useNavigation();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [games, setGames] = useState([]);
  const [notifications,setNotifications]= useState(null);
 
  function fetchNotifications(key){
    var url = "https://www.speedrun.com/api/v1/notifications";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Host", "www.speedrun.com");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-API-Key",key);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            response = JSON.parse(xhr.responseText);
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
    setGames(JSON.parse(GAMES));
    setUsername(username);
    setUserid(userid);    
    fetchNotifications(key);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    },[])
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
            <Text style={[h1,{marginLeft:20}]}>My Games</Text>
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
