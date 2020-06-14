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
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.button}>
              <Text style={styles.buttontext}>My Profile</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttontext}>My Runs</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttontext}>Settings</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttontext}>Settings</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttontext}>Settings</Text>
            </View>
          </ScrollView>
          <View style={{ paddingVertical: 20 }}></View>
          <Text style={styles.headertext}>Followed Games</Text>
          <View style={styles.gamelist}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <GameCard id={"w6jve26j"} name={"darksouls"} />
              <GameCard id={"76rkwed8"} name={"na"} />
              <GameCard id={"o1y5nvdq"} name={"nier"} />
              <GameCard id={"m1zky010"} name={"darksouls2"} />
              <GameCard id={"m1zky010"} name={"darksouls3"} />
              <GameCard id={"m1zky010"} name={"oot"} />
            </ScrollView>
          </View>
          <View style={{ paddingVertical: 20 }}></View>
          <Text style={styles.headertext}>Latest Runs</Text>
          <View style={styles.populargames}></View>
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
