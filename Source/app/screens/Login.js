import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert } from "react-native";
import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";

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
        { cancelable: true }
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

        createTwoButtonAlert(
          "Logged in successfully. Please restart the application for the changes to take effect."
        );
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
      <LinearGradient
        style={{ flex: 1 }}
        colors={[colors.primary, colors.secondary]}
      >
        <View style={styles.login}>
          <View style={styles.header}>
            <Text style={styles.h1}>Welcome back</Text>
            <Text style={styles.h2}>
              Use your credentials to login into your account
            </Text>
          </View>
          <View style={styles.textinputs}>
            <TextInput
              style={styles.textinput}
              autoCapitalize={"none"}
              placeholder={"Username"}
              autoCompleteType={"username"}
              onChangeText={(text) => this.setState({ textinput: text })}
              value={textinput}
            />
            <TextInput
              style={styles.textinput}
              autoCapitalize={"none"}
              placeholder={"API-Key"}
              autoCompleteType={"username"}
              onChangeText={(text) => this.setState({ textinput: text })}
            />
          </View>

          <View style={styles.buttons}>
            <Button
              title={"LOG IN"}
              function={this._storeData}
              user={textinput}
              color={colors.primary}
              textcolor={colors.white}
            />
            <Button
              title={"SIGN UP"}
              color={colors.white}
              textcolor={colors.primary}
            />
          </View>
          <View style={styles.footerline}>
            <Text>Don't have an API-Key? Obtain it here</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={"SKIP"}
            color={colors.white}
            textcolor={colors.darkgrey}
          ></Button>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  login: {
    flex: 4,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignContent: "center",
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    paddingHorizontal: 30,
  },

  header: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    flex: 0.5,
    justifyContent: "center",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
  },
  footerline: {
    flex: 0.4,
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },
  h2: {
    fontSize: 15,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
});

export default Login;
