import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
class User extends Component {
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

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Profile", {
            username: this.props.username,
            userid: this.props.userid,
          })
        }
        style={styles.container}
      >
        <View style={styles.user}>
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri: this.state.userpicture,
              }}
              style={styles.Image}
            ></Image>
          </View>

          <View style={styles.textcontainer}>
            <Text style={styles.usename}>{this.state.username}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  user: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,

    // add shadows for Android only
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 5,
  },
  Image: {
    height: 50,
    width: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: colors.light,
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  textcontainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  usename: { color: colors.darkgrey, fontWeight: "bold", fontSize: 20 },
  iconcontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default User;
