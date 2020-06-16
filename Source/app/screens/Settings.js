import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
  Button,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user";
import User from "../components/User";
import Constants from "expo-constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

class Settings extends React.Component {
  state = {
    username: "",
    API_Key: "",
  };
  constructor(props) {
    super(props);
    this.getData();
  }
  loadUsername = async () => {
    try {
      this.setState({ username: "Asiern" });
      await AsyncStorage.setItem("username", this, state.username);
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        this.setState({ username: value });
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <User username={user.name} />
        </View>
        <View style={styles.settings}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="#262626"
            autoCapitalize="none"
          />
          <Text>{this.state.username}</Text>
          <Button
            onPress={this.loadUsername()}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          ></Button>
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
