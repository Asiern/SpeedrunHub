import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: "center" }}>Nothing Here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Settings;
