import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import GameCard from "../components/GameCard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user";
import User from "../components/User";
import Constants from "expo-constants";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <User username={user.name} />
        </View>
      </View>
    );
  }
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
});

export default Profile;
