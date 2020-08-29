import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import colors from "../config/colors";
export default class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryid: this.props.categoryid,
      category: this.props.category,
      place: this.props.place,
      time: this.props.time,
      runner: this.props.runner,
      runnerid: this.props.runnerid,
      cover:
        "https://www.speedrun.com/themes/" +
        this.props.abbreviation +
        "/cover-64.png",
      game: this.props.game,
      abbreviation: this.props.abbreviation,
      weblink: this.props.weblink,
      loading: true,
    };
  }
  loadInBrowser = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  componentDidMount() {
    try {
      this.timeConverter();
      this.FetchUser(this.state.runnerid);
    } catch (error) {
      console.log(error);
    }
  }
  timeConverter() {
    var result = this.state.time.toLowerCase();
    result = result.substr(2, result.lenght);
    this.setState({ time: result });
  }
  async FetchUser(runnerid) {
    const url = "https://www.speedrun.com/api/v1/users/" + runnerid;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, runner: data.data.names.international });
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.loadInBrowser(this.state.weblink)}
      >
        <View style={styles.game}>
          <Image
            style={styles.cover}
            source={{ uri: this.state.cover }}
          ></Image>
        </View>
        <View style={styles.category}>
          <Text style={styles.text}>{this.state.category}</Text>
        </View>
        <View style={styles.place}>
          <Text style={styles.accenttext}>{this.state.place}</Text>
        </View>

        <View style={styles.time}>
          <Text style={styles.text}>{this.state.time}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,

    // add shadows for Android only
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 1,
  },
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 1,
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
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.primary,
  },
  cover: {
    height: 60,
    width: 45,
  },
});
module.export = Run;
