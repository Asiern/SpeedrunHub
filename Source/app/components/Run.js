import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import colors from "../config/colors";
export default class Run extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      runner: "",
    };
  }
  loadInBrowser = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  timeConverter() {
    var result = this.props.time.toLowerCase();
    return result.substr(2, result.lenght);
  }
  componentDidMount() {
    this.FetchUser();
  }
  async FetchUser() {
    const url = "https://www.speedrun.com/api/v1/users/" + this.props.runnerid;
    const response = await fetch(url);
    const data = await response.json();
    const runner = data.data.names.international;
    this.setState({ runner });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.loadInBrowser(this.props.weblink)}
        style={styles.container}
      >
        <View style={styles.place}>
          <Text style={styles.accenttext}>{this.props.place}</Text>
        </View>
        <View style={styles.runner}>
          <Text style={styles.text}>{this.state.runner}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.text}>{this.timeConverter()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 5,
  },
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
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
  place: {
    flex: 3,
    alignItems: "center",
  },
  runner: {
    flex: 8,
    alignItems: "center",
  },
  time: {
    flex: 8,
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
});
module.export = Run;
