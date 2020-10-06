import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";
import colors from "../config/colors";

const ProfileHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.topbarleft}>
          <Feather
            onPress={() => props.navigation.navigate("Home")}
            name="arrow-left"
            color={colors.white}
            size={35}
            style={{ paddingLeft: 20 }}
          />
        </View>
        <View style={styles.topbarcenter}></View>
        <View style={styles.topbarright}></View>
      </View>
      <View style={styles.imagecontainer}>
        <Image
          source={{
            uri:
              "https://www.speedrun.com/themes/user/" +
              props.username +
              "/image.png",
          }}
          style={styles.Image}
        ></Image>
      </View>
      <View style={styles.userinfo}>
        <Text style={styles.h1}>{props.username}</Text>
        <View style={styles.country}>
          <View>
            <Text style={styles.h2}>{props.country}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
  },
  profile: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  h1: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default ProfileHeader;
