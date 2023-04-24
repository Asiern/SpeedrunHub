import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import Constants from "expo-constants";

import HomeHeader from "./HomeHeader";
import SearchBar from "../../components/SearchBar";
import Notifications from "./Notifications";
import { GameList } from "./GameList";
import { context } from "../../config/config";

export default function Home() {
  const navigator = useNavigation();

  function onSearch(query: string) {
    navigator.navigate("Search", { query: query });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <SearchBar {...{ onSearch }} />
        {/* <Notifications /> */}
      </View>
      <View style={{ flex: 1 }}>{/* <GameList /> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fafafe",
  },
});
