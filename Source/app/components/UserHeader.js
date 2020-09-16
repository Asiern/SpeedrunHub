import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Dimensions,
  DevSettings,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Svgheader from "./svgheader";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("screen");

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: this.props.username,
      userpicture:
        "https://www.speedrun.com/themes/user/" +
        this.props.username +
        "/image.png",
    };
  }

  async signOut() {
    //Remove user
    await AsyncStorage.setItem("@user", "");
    await AsyncStorage.setItem("@userid", "");
    //Set login to 1
    await AsyncStorage.setItem("@Loggedin", "false");
    //Restart app
    DevSettings.reload();
  }
  render() {
    const createTwoButtonAlert = (msg) =>
      Alert.alert(
        "Alert",
        msg,
        [
          { text: "OK", onPress: () => this.signOut() },
          { text: "Cancel", onPress: () => null },
        ],

        { cancelable: false }
      );
    return (
      <View style={styles.container}>
        <Svgheader width={width} height={height / 5} />
        <View style={styles.headercontainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                username: this.props.username,
                userid: this.props.userid,
              })
            }
            style={styles.touch}
          >
            <View style={styles.imagecontainer}>
              <Image
                source={{
                  uri:
                    "https://www.speedrun.com/themes/user/" +
                    this.props.username +
                    "/image.png",
                }}
                style={styles.Image}
              ></Image>
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.welcome}>Welcome back,</Text>
              <Text style={styles.usename}>{this.props.username}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconcontainer}
            onPress={() =>
              createTwoButtonAlert("Are you sure you want to log out?")
            }
          >
            <FontAwesome5 name="sign-out-alt" color={colors.white} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    top: height / 10 - 30,
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
  },
  Image: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  touch: {
    marginLeft: 10,
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textcontainer: {
    flex: 2,
    flexDirection: "column",
  },
  welcome: { color: colors.light },
  usename: { color: colors.white, fontWeight: "bold", fontSize: 25 },
  iconcontainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginRight: 20,
    justifyContent: "flex-end",
  },
});

export default UserHeader;
