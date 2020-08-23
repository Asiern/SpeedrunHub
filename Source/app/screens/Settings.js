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
        <Button
          title={"Login"}
          style={styles.button}
          color={colors.primary}
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Text style={{ alignSelf: "center" }}></Text>
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
