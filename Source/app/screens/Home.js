import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
} from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import Test from "./test";
import User from "../components/User";
import Leaderboard from "../components/Leaderboard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../assets/json/user.json";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("name");
      if (value !== null) {
        // Our data is fetched successfully
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal visible={this.state.show} style={{ padding: 20 }}>
          <View style={styles.modalbuttons}>
            <Icon
              name="ios-arrow-back"
              color={colors.secondary}
              size={40}
              onPress={() => {
                this.setState({ show: false });
              }}
            />
            <Icon name="ios-options" color={colors.secondary} size={40} />
          </View>
          <Test />
        </Modal>
        <ScrollView style={styles.container}>
          <View style={styles.profile}>
            <User username={user.name} />
          </View>
          <View style={{ paddingVertical: 20 }}></View>
          <Text style={styles.headertext}>Followed Games</Text>
          <View style={styles.gamelist}>
            <GameCard id={"w6jve26j"} name={"darksouls"} />
            <GameCard id={"76rkwed8"} name={"na"} />
            <GameCard id={"o1y5nvdq"} name={"nier"} />
            <GameCard id={"m1zky010"} name={"darksouls2"} />
            <GameCard id={"m1zky010"} name={"darksouls3"} />
            <GameCard id={"m1zky010"} name={"oot"} />
          </View>
        </ScrollView>
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
  button: {
    paddingLeft: 20,
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
  modalbuttons: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: colors.light,
  },
  gamelist: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  populargames: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Home;
