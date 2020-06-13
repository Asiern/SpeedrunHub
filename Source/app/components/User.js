import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";

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
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image
            source={{
              uri: this.state.userpicture,
            }}
            style={styles.Image}
          ></Image>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.usename}>{this.state.username}</Text>
        </View>

        <View style={styles.iconcontainer}>
          <Icon
            onPress={() => Alert.alert("Notifications")}
            name="ios-notifications-outline"
            color={colors.secondary}
            size={35}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  Image: {
    height: 50,
    width: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
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
  },
  welcome: {},
  usename: { color: colors.secondary, fontWeight: "bold", fontSize: 20 },
  iconcontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default User;
