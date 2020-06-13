import React from "react";
import { StyleSheet, View, Text, Image, Button, Alert } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
const cover = {
  uri: "https://www.speedrun.com/themes/darksouls/cover-256.png",
};

var cata = "Any%";

export default function Test() {
  return (
    <TapGestureHandler>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.info}>
          <View style={styles.cover}>
            <Image source={cover} style={styles.coverimg}></Image>
            <Text style={styles.title}>Dark Souls</Text>
            <Text style={styles.text}>12-12-2012</Text>
          </View>
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
        <View style={styles.leaderboard}>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
          <Text>asjdhnasiudnas</Text>
        </View>
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
    flex: 1,
    alignSelf: "stretch",
  },
  info: {
    height: 500,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
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
    color: colors.secondary,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: colors.secondary,
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
