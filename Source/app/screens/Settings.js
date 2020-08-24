import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TouchableOpacityComponent,
  ImageBackground,
} from "react-native";
import { Divider, Text } from "react-native-paper";
import Constants from "expo-constants";
import colors from "../config/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <View style={styles.button}>
              <View style={styles.icon}>
                <FontAwesome5
                  name="user-alt"
                  color={colors.primary}
                  size={20}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.text}>My Account</Text>
              </View>
              <View style={styles.icon}>
                <FontAwesome5
                  name="angle-right"
                  color={colors.darkgrey}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Themes")}
          >
            <View style={styles.button}>
              <View style={styles.icon}>
                <FontAwesome5 name="brush" color={colors.primary} size={20} />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.text}>Themes</Text>
              </View>
              <View style={styles.icon}>
                <FontAwesome5
                  name="angle-right"
                  color={colors.darkgrey}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("About")}
          >
            <View style={styles.button}>
              <View style={styles.icon}>
                <FontAwesome5 name="info" color={colors.primary} size={20} />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.text}>About</Text>
              </View>
              <View style={styles.icon}>
                <FontAwesome5
                  name="angle-right"
                  color={colors.darkgrey}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("About")}
          >
            <View style={styles.button}>
              <View style={styles.icon}>
                <FontAwesome5
                  name="user-shield"
                  color={colors.primary}
                  size={20}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.text}>
                  Privacy Policy / Terms & Conditions
                </Text>
              </View>
              <View style={styles.icon}>
                <FontAwesome5
                  name="angle-right"
                  color={colors.darkgrey}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
  },
  buttons: {
    flex: 1,
    backgroundColor: colors.light,
  },
  button: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  textcontainer: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  h2: {},
});

export default Settings;
