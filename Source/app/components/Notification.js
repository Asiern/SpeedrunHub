import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <ImageBackground
          source={require("../assets/Notification.jpg")}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={styles.text}> Notification </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    color: colors.white,
  },
});

export default Notification;
