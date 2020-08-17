import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import Run from "../components/Run";
import user from "../config/user.json";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: "",
      userid: "",
      userpicture: "",
      runs: [],
    };
  }
  async loadData() {
    const { username, userid } = this.props.route.params;
    this.setState({
      userid,
      username,
    });
    const runsurl =
      "https://www.speedrun.com/api/v1/users/" +
      userid +
      "/personal-bests?embed=game,category";
    const runsresponse = await fetch(runsurl);
    const runsdata = await runsresponse.json();

    this.setState({ loading: false, runs: runsdata.data });
  }
  async componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.profileBG}
          source={require("../assets/Notification.jpg")}
        >
          <View style={styles.topbar}>
            <Icon
              //onPress={() => this.goBack()}
              name="ios-arrow-back"
              color={colors.white}
              size={35}
            />
            <Text style={styles.h2}>Profile</Text>
            <Icon
              //onPress={() => this.props.navigation.navigate("Home")}
              name="ios-more"
              color={colors.white}
              size={35}
            />
          </View>
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri:
                  "https://www.speedrun.com/themes/user/" +
                  this.state.username +
                  "/image.png",
              }}
              style={styles.Image}
            ></Image>
          </View>

          <View style={styles.userinfo}>
            <View style={styles.userinfoitem}>
              <Text style={styles.h1}>{this.state.username}</Text>
              <View style={styles.country}>
                <View>
                  <Text style={styles.h2}>Basque Country</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.pbs}>
          <View style={styles.runinfo}>
            <View style={styles.game}>
              <Text>Game</Text>
            </View>
            <View style={styles.category}>
              <Text>Category</Text>
            </View>
            <View style={styles.place}>
              <Text>Place</Text>
            </View>
            <View style={styles.runner}>
              <Text>Runner</Text>
            </View>
            <View style={styles.time}>
              <Text>Time</Text>
            </View>
          </View>
          {this.state.runs.map((run) => (
            <Run
              key={run.run.id}
              category={run.category.data.name}
              place={run.place}
              runner={this.state.username}
              time={run.run.times.primary}
              game={run.game.data.names.international}
              abbreviation={run.game.data.abbreviation}
            />
          ))}
        </View>
      </ScrollView>
    );
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
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  profile: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  h1: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  headertext: {
    color: colors.light,
    backgroundColor: colors.Crystalline1,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    borderRadius: 15,
    padding: 10,
  },
  pbs: {
    flex: 1,
    margin: 10,
  },
  runinfo: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  game: {
    flex: 3,
    //backgroundColor: "dodgerblue",
    alignItems: "center",
  },
  category: {
    flex: 5,
    //backgroundColor: "gold"
    alignItems: "center",
  },
  place: {
    flex: 3,
    //backgroundColor: "tomato",
    alignItems: "center",
  },
  runner: {
    flex: 5,
    //backgroundColor: "green",
    alignItems: "center",
  },
  time: {
    flex: 8,
    //backgroundColor: "orange",
    alignItems: "center",
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

export default Profile;
