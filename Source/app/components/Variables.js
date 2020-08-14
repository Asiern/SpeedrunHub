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
      url: "",
      test: "",
      array: ["1", "2", "3"],
    };
  }
  async getVariables() {
    const variables =
      "https://www.speedrun.com/api/v1/categories/" +
      this.state.categoryid +
      "/variables?";
    const response = await fetch(variables);
    const data = await response.json();

    var subcategories = [];
    for (let variable of data.data) {
      const str = "variable.is-subcategory";
      if (str == true) {
        //Add sub-category to list
        let subcategory = [
          {
            id: variable.id,
            name: variable.name,
            //values
          },
        ];
        //console.log(subcategory);
        subcategories.push(subcategorysubcategory);
      }
    }
    this.setState({ variables: data.data, isLoading: false, subcategories });
    //console.log(subcategories[0]);
    const a = varia.data[0].values.default;
    //console.log(varia.data[0].values.values);
  }
  componentDidMount() {
    this.getVariables();
  }
  test = (input) => {
    this.setState({ test: input });
  };
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else if (this.state.variables == null) {
      return <Text>Select Category{this.state.categoryid}</Text>;
    } else {
      return (
        <View style={styles.container}>
          {this.state.variables.map((item) => (
            <View key={item.id} style={styles.button}>
              <FlatList
                keyExtractor={(item) => item}
                data={item.links}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.button}>
                    <Button
                      title={item.rel}
                      style={styles.button}
                      color={colors.Crystalline1}
                    />
                  </View>
                )}
              ></FlatList>
            </View>
          ))}
          <Leaderboard
            gameid={this.props.gameid}
            categoryid={this.props.categoryid}
            url={
              "https://www.speedrun.com/api/v1/leaderboards/76rkwed8/category/rklqxrn2"
            }
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "gold",
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    height: 45,
    alignSelf: "center",
  },
});

export default Variables;
