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
      time: this.props.time,
      runner: this.props.runner,
      loading: true,
    };
  }
  loadInBrowser = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  componentDidMount() {
    this.timeConverter();
    this.FetchUser(this.props.runnerid);
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
          <Text style={styles.text}>{this.state.time}</Text>
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
