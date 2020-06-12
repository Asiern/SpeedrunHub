import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  Image,
  Button,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";
import {
  ScrollView,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
const cover = {
  uri: "https://www.speedrun.com/themes/darksouls/cover-256.png",
};
const na = {
  uri: "https://www.speedrun.com/themes/darksouls/cover-256.png",
  style: { opacity: 0.4 },
};
const black = {
  uri:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.telerik.com%2Fclientsfiles%2F287558_TestCase11772-B-07-25-2011-11-25-31-9633.png%3Fsfvrsn%3D58f4aa62_0&f=1&nofb=1",
};
var cata = "Any%";

export default function Test() {
  return (
    <TapGestureHandler>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.info}>
          <ImageBackground source={na} style={styles.bgimage}>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Icon name="ios-arrow-back" color={colors.white} size={35} />
              </View>
              <View style={styles.button}>
                <Icon name="ios-options" color={colors.white} size={40} />
              </View>
            </View>

            <View style={styles.cover}>
              <Image source={cover} style={styles.coverimg}></Image>
              <Text style={styles.title}>Dark Souls</Text>
              <Text style={styles.text}>12-12-2012</Text>
            </View>
          </ImageBackground>
        </View>

        <ScrollView style={styles.categoriesScrollView} horizontal={true}>
          <View style={styles.categories}>
            <Button
              onPress={() => (cata = "Any%")}
              title="Any%"
              color="#0F7A4D"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.categories}>
            <Button
              onPress={() => (cata = "Any% No Wrong Warp")}
              title="Any% No Wrong Warp"
              color="#0F7A4D"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.categories}>
            <Button
              onPress={() => Alert.alert("Simple Button pressed")}
              title="Any% Force Quit"
              color="#0F7A4D"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.categories}>
            <Button
              onPress={() => Alert.alert("Simple Button pressed")}
              title="All Bosses"
              color="#0F7A4D"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.categories}>
            <Button
              onPress={() => Alert.alert("Simple Button pressed")}
              title="All Achievements"
              color="#0F7A4D"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </ScrollView>
        <View style={styles.leaderboard}></View>
      </ScrollView>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollViewContainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignSelf: "stretch",
  },
  info: {
    height: 600,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: colors.black,
  },
  buttons: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignSelf: "stretch",
  },
  button: {
    justifyContent: "flex-end",
  },
  bgimage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    //opacity: 0.4,
  },
  cover: {
    flex: 5,
    justifyContent: "center",
  },
  coverimg: {
    height: 210,
    width: 150,
  },
  title: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: colors.white,
    alignSelf: "center",
  },
  categoriesScrollView: {
    height: 100,
    backgroundColor: colors.light,
  },
  categories: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  leaderboard: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
