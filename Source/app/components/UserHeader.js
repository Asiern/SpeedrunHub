import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user.json";

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

  miputafuncion = (input) => {
    this.setState({
      username: input,
      userpicture:
        "https://www.speedrun.com/themes/user/" + input + "/image.png",
    });
  };
  render() {
    return (
      <ImageBackground
        style={styles.profileBG}
        source={require("../assets/UserHeader.png")}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                username: "Asiern",
                userid: "48g3q2rx",
              })
            }
            style={styles.imagecontainer}
          >
            <Image
              source={{
                uri: this.state.userpicture,
              }}
              style={styles.Image}
            ></Image>
          </TouchableOpacity>

          <View style={styles.textcontainer}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.usename}>{this.state.username}</Text>
          </View>

          <View style={styles.iconcontainer}>
            <Icon
              onPress={() => this.props.navigation.navigate("Settings")}
              name="ios-options"
              color={colors.white}
              size={35}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 50,
  },
  profileBG: {
    flex: 1,
    resizeMode: "cover",
  },
  Image: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
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
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserHeader;
