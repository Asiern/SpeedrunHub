import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import User from "../components/User";
import colors from "../config/colors";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <User />
      </View>
      <View style={{ paddingVertical: 20 }}></View>
      <Text style={styles.headertext}>Followed Games</Text>
      <View style={styles.gamelist}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <GameCard id={"w6jve26j"} name={"darksouls"} />
          <GameCard id={"76rkwed8"} name={"na"} />
          <GameCard id={"o1y5nvdq"} name={"nier"} />
          <GameCard id={"m1zky010"} name={"darksouls2"} />
        </ScrollView>
      </View>
      <View style={{ paddingVertical: 20 }}></View>
      <Text style={styles.headertext}>Popular Games</Text>
      <View style={styles.populargames}>
        <View style={styles.gamelist}>
          <GameCard id={"w6jve26j"} name={"darksouls"} />
          <GameCard id={"76rkwed8"} name={"na"} />
          <GameCard id={"o1y5nvdq"} name={"nier"} />
          <GameCard id={"m1zky010"} name={"darksouls2"} />
        </View>
        <View style={styles.gamelist}>
          <GameCard id={"w6jve26j"} name={"darksouls"} />
          <GameCard id={"76rkwed8"} name={"na"} />
          <GameCard id={"o1y5nvdq"} name={"nier"} />
          <GameCard id={"m1zky010"} name={"darksouls2"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  profile: {
    backgroundColor: colors.secondary,
    marginTop: Constants.statusBarHeight,
    height: 100,
  },
  gamelist: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  populargames: {
    flex: 1,
    flexDirection: "row",
  },
});
