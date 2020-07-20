import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  user: {
    flex: 1,
  },
  settings: {
    flex: 4,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
});

export default Settings;
