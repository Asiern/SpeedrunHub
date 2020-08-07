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
import Run from "./Run";
import Leaderboard from "./Leaderboard";

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
      url: "",
    };
  }
  async getVariables() {
    const variables =
      "https://www.speedrun.com/api/v1/categories/" +
      this.state.categoryid +
      "/variables?";
    const response = await fetch(variables);
    const data = await response.json();
    this.setState({ variables: data.data, isLoading: false });
  }
  componentDidMount() {
    this.getVariables();
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else if (this.state.variables == null) {
      return <Text>Select Category</Text>;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.variables}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.button}>
                <Button
                  title={item.name}
                  style={styles.button}
                  color={colors.Crystalline1}
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            )}
          ></FlatList>
          <Leaderboard />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    height: 45,
  },
});

export default Variables;
