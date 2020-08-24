import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Alert,
} from "react-native";
import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textinput: "",
      username: "",
      userid: "",
    };
  }

  _storeData = async (user) => {
    const createTwoButtonAlert = (msg) =>
      Alert.alert(
        "Alert",
        msg,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    try {
      const url = "https://www.speedrun.com/api/v1/users/" + user;
      const response = await fetch(url);
      const data = await response.json();

      if (data.data.id !== null) {
        const id = data.data.id;
        const name = data.data.names.international;
        await AsyncStorage.setItem("@user", name);
        await AsyncStorage.setItem("@userid", id);
        this._retrieveData();
        createTwoButtonAlert("Logged in successfully.");
      }
    } catch (error) {
      createTwoButtonAlert(
        "User not found, please type the username as shown on Speedrun.com"
      );
    }
  };
  _retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem("@user");
      const userid = await AsyncStorage.getItem("@userid");
      this.setState({ username: username, userid: userid });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  updateSearch = (input) => {
    this.setState({ search: input });
  };
  render() {
    const { textinput } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <Text style={styles.headertext}>Username</Text>
          <View style={styles.userdata}>
            <View style={styles.username}>
              <Text style={styles.paragraph}>User: {this.state.username} </Text>
            </View>

            <View style={styles.userid}>
              <Text style={styles.paragraph}>User ID: {this.state.userid}</Text>
            </View>
          </View>

          <TextInput
            style={styles.textinput}
            autoCapitalize={"none"}
            placeholder={"Type your Speedrun.com username"}
            autoCompleteType={"username"}
            onChangeText={(text) => this.setState({ textinput: text })}
            value={textinput}
          />
          <Button
            title={"Save"}
            color={colors.primary}
            onPress={() => this._storeData(textinput)}
          />
        </View>

        <View style={styles.api}>
          <Text style={styles.headertext}>API Key</Text>
          <TextInput
            style={styles.textinput}
            editable={false}
            autoCapitalize={"none"}
            placeholder={"Type your Speedrun.com API Key"}
            autoCompleteType={"username"}
          />
          <Button title={"Save"} color={colors.primary} disabled={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  user: {
    flex: 5,
    padding: 20,
  },
  userdata: {
    flexDirection: "row",
  },
  username: { flex: 1 },
  userid: { flex: 1 },
  headertext: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 25,
    paddingTop: 20,
  },
  paragraph: {
    paddingVertical: 10,
    fontSize: 15,
  },
  api: {
    flex: 5,
    padding: 20,
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    margin: 20,
    height: 45,
    alignSelf: "center",
  },
  buttontext: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    textAlign: "center",
    color: colors.darkgrey,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 5,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default Login;
