import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import colors from "../config/colors";
import Leaderboard from "./Leaderboard";
import varia from "../assets/json/var.json";
import varout from "../assets/json/out.json";

class Variables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      runs: [],
      name: this.props.name,
      gameid: this.props.gameid,
      categoryid: this.props.categoryid,
      variables: [],
      subcategories: [],
    };
  }
  async getVariables() {
    const variablesurl =
      "https://www.speedrun.com/api/v1/categories/" +
      this.props.categoryid +
      "/variables?";
    const response = await fetch(variablesurl);
    const data = await response.json();

    var subcategories = [];
    var subcategory = { id: "", name: "", values: {} };
    var value = { id: "", label: "" };
    for (let variable of data.data) {
      const str = variable["is-subcategory"];
      if (str == true) {
        subcategory.id = variable.id;
        subcategory.name = variable.name;
        for (var a in variable.values.values) {
          value.id = a;
          //value.label = variable.values.values.a.label;

          //add value to subcategory.values
        }
        //subcategory.push(id, varid);
      }
      console.log(subcategory);
    }
    //subcategories.push(subcategory);
    //console.log(subcategories);
    this.setState({ variables: data.data, isLoading: false });
  }
  componentDidMount() {
    this.getVariables();
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else if (this.state.variables == null) {
      return <Text>Select Category{this.state.categoryid}</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Leaderboard
            gameid={this.props.gameid}
            categoryid={this.props.categoryid}
            url={
              "https://www.speedrun.com/api/v1/leaderboards/" +
              this.props.gameid +
              "/category/" +
              this.props.categoryid
            }
            abbreviation={this.props.abbreviation}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    paddingHorizontal: 20,
    height: 45,
    alignSelf: "center",
  },
});

export default Variables;
