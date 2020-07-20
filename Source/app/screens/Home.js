import React, { Component } from "react";
import { StyleSheet, View, Modal, FlatList, Text } from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import Test from "./test";
import User from "../components/User";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user.json";
import { color } from "react-native-reanimated";

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
        <View style={styles.profilecontainer}>
          <View style={styles.profile}>
            <User username={user.name} />
          </View>
        </View>

        <View style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={user.games}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <GameCard
                  id={item.id}
                  abbreviation={item.abbreviation}
                  onPress={() => {
                    this.setState({ show: true });
                  }}
                />
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
    //marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  profilecontainer: {
    backgroundColor: colors.white,
  },
  profile: {
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
    color: colors.Crystalline1,
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  flatList: {
    flexWrap: "wrap",
    flex: 1,
    alignContent: "center",
    backgroundColor: colors.light,
  },
});

export default Home;
