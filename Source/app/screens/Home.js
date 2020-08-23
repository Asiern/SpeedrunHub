import React, { Component } from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import GameCard from "../components/GameCard";
import UserHeader from "../components/UserHeader";
import colors from "../config/colors";
import user from "../config/user.json";
import { ScrollView, FlatList } from "react-native-gesture-handler";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Guest",
      userid: "",
    };
  }
  _retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem("@user");
      const userid = await AsyncStorage.getItem("@userid");
      this.setState({ username: username, userid: userid });
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profilecontainer}>
          <View style={styles.profile}>
            <UserHeader
              username={this.state.username}
              userid={this.state.userid}
              navigation={this.props.navigation}
            />
          </View>
        </View>
        {/*<Text style={styles.headertext}>Notifications</Text>
      <View style={styles.notifications}>
        <Notification />
        <Notification />
        <Notification />
  </View>*/}

        <Text style={styles.headertext}>My Games</Text>
        <View style={styles.flatList}>
          {user.games.map((game) => (
            <View key={game.id} style={styles.button}>
              <GameCard
                navigation={this.props.navigation}
                id={game.id}
                abbreviation={game.abbreviation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilecontainer: {},
  profile: {
    height: 250,
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
    margin: 20,
    justifyContent: "space-between",
  },
  notifications: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default Home;
