import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacityComponent,
} from "react-native";
import {
  Content,
  Card,
  CardItem,
  Body,
  Left,
  List,
  ListItem,
} from "native-base";
import { color } from "react-native-reanimated";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";
export default class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryid: this.props.category,
      category: "",
      place: this.props.place,
      time: this.props.time,
      runner: this.props.runner,
      cover: "https://www.speedrun.com/themes/oot/cover-128.png",
      game: [],
      loading: true,
      abbreviation: "darksouls",
    };
  }
  fetchCategory() {
    fetch("https://www.speedrun.com/api/v1/categories/" + this.state.categoryid)
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.category = responseJson.data.name;
      })
      .catch((error) => {
        console.log("Data fetching failed");
      });
  }
  async componentDidMount() {
    const url = "https://www.speedrun.com/api/v1/games/" + this.props.gameid;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      loading: false,
      game: data.data,
    });
    //this.setState({ abbreviation: this.state.game.abbreviation.toString() });
    const coveruri = this.state.game.assets.logo.uri;
    this.setState({ cover: coveruri });
  }
  componentWillMount() {
    this.fetchCategory();
  }

  render() {
    return (
      <Content>
        <View style={styles.container}>
          <Image
            style={styles.cover}
            source={{ uri: this.state.cover }}
          ></Image>
          <Text style={styles.text}>{this.state.category}</Text>
          <Text style={styles.accenttext}>{this.state.place}</Text>
          <Text style={styles.text}>{this.state.time}</Text>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.Crystalline1,
  },
  cover: {
    height: 60,
    width: 45,
  },
});
module.export = Run;
