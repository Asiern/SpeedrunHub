import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import Test from "./test";
import User from "../components/User";
import Leaderboard from "../components/Leaderboard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user.json";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
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
        <View style={styles.profile}>
          <User username={user.name} />
        </View>
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={user.games}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <GameCard id={item.id} abbreviation={item.abbreviation} />
              </View>
            )}
            numColumns={2}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
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
  card: {
    flexWrap: "wrap",
    flex: 1,
    alignContent: "center",
  },
});

export default Home;
