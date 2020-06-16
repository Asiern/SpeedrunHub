import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import data from "../assets/json/Any%Leaderboard.json";
import Run from "./Run";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      name: this.props.name,
    };
  }
  getData() {
    fetch(
      "https://www.speedrun.com/api/v1/leaderboards/xldev513/category/rklg3rdn"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson.data.runs);
        this.setState({ dataSource: responseJson.data.runs, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.isLoading) {
      <ActivityIndicator />;
    }
    return (
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: 20,
        }}
      >
        <View style={styles.container}>
          <View style={styles.banner}>
            <ImageBackground
              source={{
                uri:
                  "https://www.speedrun.com/themes/" +
                  this.state.name +
                  "/cover-256.png",
              }}
              style={styles.image}
            >
              <Text style={styles.title}>{this.state.name}</Text>
            </ImageBackground>
          </View>
          <Run data={this.state.dataSource} />
          <Run data={this.state.dataSource} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  banner: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 60,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: "row",
    opacity: 1,
  },
  title: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Leaderboard;
