import React from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
} from "react-native";
import Constants from "expo-constants";
import color from "../config/colors";
import GameList from "../components/GameList";
import colors from "../config/colors";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Image
          style={styles.logo}
          source={require("../assets/asiern.png")}
        ></Image>
        <Text style={styles.text}>SPEEDRUN.COM</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <GameList />
        <GameList />
        <GameList />
        <GameList />
        <GameList />
        <GameList />
        <GameList />
        <GameList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.secondary,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    height: 80,
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  logo: {
    height: 40,
    width: 40,
  },
});
