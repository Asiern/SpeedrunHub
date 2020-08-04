import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import Run from "../components/Run";
import user from "../config/user.json";
import { useScreens } from "react-native-screens";
import GameCard from "../components/GameCard";
import Leaderboard from "../components/Leaderboard";



class GameInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: "NieR: Automata",
      id: "",
      abbreviation:"",
      game: [],
    };
  }
  loadData = () => {
    const{id,abbreviation,other}=this.props.route.params
    this.setState({id,abbreviation});
  };
  async componentDidMount() {
    this.loadData();
    const url =
      "https://www.speedrun.com/api/v1/games/"+this.props.route.params.id+"?embed=categories";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ loading: false, game: data.data });
    //console.log(this.state.game.categories);
  }
  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ alignSelf: "center", flex: 1, scaleX: 2, scaleY: 2 }}
        />
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <ImageBackground
            style={styles.profileBG}
            source={{ uri: "https://www.speedrun.com/themes/"+this.state.abbreviation+"/cover-256.png" }}
            opacity={0.3}
          >
            <View style={styles.profile}>
              <View style={styles.imagecontainer}>
                <Image
                  source={{
                    uri: "https://www.speedrun.com/themes/"+this.state.abbreviation+"/cover-256.png",
                  }}
                  style={styles.Image}
                ></Image>
              </View>
            </View>

            <View style={styles.userinfo}>
              <View style={styles.userinfoitem}>
                <Text style={styles.h1}>
                  {this.state.game.names.international}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View>
            <Text style={styles.headertext}>Categories</Text>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.game.categories.data}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={styles.button}>
                  <Text>{item.name}</Text>
                </View>
              )}
            ></FlatList>
          </View>
          <Text style={styles.headertext}>Runs</Text>
          <View style={styles.pbs}>
            <Leaderboard
              name={this.state.abbreviation}
              gameid={this.state.id}
              categoryid={"9kvmp98k"}
            />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  profileBG: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor:colors.black
  },
  profile: {
    flex: 1,
  },
  country: {
    flexDirection: "row",
  },
  flag: {
    height: 18,
    width: 25,
  },
  imagecontainer: {
    flex: 1,
    paddingTop: 30,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    width: 110,
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  socialbuttons: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  h1: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.darkgrey,
    fontSize: 15,
    fontWeight: "normal",
    alignSelf: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 40,
  },
  pbs: {
    flex: 1,
    margin: 10,
  },
  runinfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 20,
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
});

export default GameInfo;
