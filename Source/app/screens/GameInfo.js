import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
} from "react-native";
import Run from "../components/Run";
import colors from "../config/colors";

class GameInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      id: "",
      abbreviation: "",
      game: [],
      selectedCategory: "",
      url: "",
      runs: [],
      variables: [],
    };
  }
  async componentDidMount() {
    try {
      //Load gameId & abbreviation from react navigation
      const { id, abbreviation } = this.props.route.params;
      //Get Game Data
      //Fetch Categories from Speedrun.com
      const url =
        "https://www.speedrun.com/api/v1/games/" +
        this.props.route.params.id +
        "?embed=categories";
      const response = await fetch(url);
      const data = await response.json();
      //Select Default Category
      const selectedCategory = data.data.categories.data[0].id;
      //Fetch Variables
      this.LoadVariables(selectedCategory);
      //Load Runs
      this.LoadRuns(selectedCategory);
      //Set State
      this.setState({ loading: false, game: data.data, id, abbreviation });
    } catch (error) {
      console.log(error);
    }
  }
  async LoadVariables(categoryid) {
    try {
      //Fetch Variables from Speedrun.com
      const variablesUrl =
        "https://www.speedrun.com/api/v1/categories/" +
        categoryid +
        "/variables?";
      const varResponse = await fetch(variablesUrl);
      const varData = await varResponse.json();
      //Output Objects
      var outSubcategoies = [];
      var outSubcategory = {
        id: "",
        name: "",
        values: [],
      };
      var outValue = {
        label: "",
        id: "",
        //rules: "",
      };
      //Get subcategories (is-subcategory===true)
      for (let subcategory of varData.data) {
        const str = subcategory["is-subcategory"];
        if (str == true) {
          //console.log(subcategory.name);
          //varData.data.is-subcategory == true
          //Load data into output
          outSubcategory.id = subcategory.id;
          outSubcategory.name = subcategory.name;
          //Get subcategory variables
          for (let variable in subcategory.values.values) {
            //Load outValue with data
            outValue.id = variable;
            outValue.label = subcategory.values.values[variable].label;
            //outValue.rules = subcategory.values.values[variable].rules;
            //Load output to outSubcategory.values
            console.log(outValue);
            //Push removes previous value
            console.log(outSubcategory.values);
            outSubcategory.values.push(outValue);
          }
          //Load values into output
          //out.subcategory.values =
          //Load subcategory into list
          outSubcategoies.push(outSubcategory);
          //console.log(outSubcategoies);
          this.setState({ variables: outSubcategoies });
        }
      }
      //console.log(this.state.variables[0].values);
    } catch (error) {
      console.log(error);
    }
  }
  async LoadRuns(categoryid) {
    try {
      this.setState({ loading: true });
      //Build Url
      const url =
        "https://www.speedrun.com/api/v1/leaderboards/" +
        this.props.route.params.id +
        "/category/" +
        categoryid;
      this.setState({ url });
      //Fetch Runs from Speedrun.com
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ runs: data.data.runs, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  renderItem = ({ item }) => (
    <Run
      place={item.place}
      runnerid={item.run.players[0].id}
      time={item.run.times.primary}
      abbreviation={this.props.abbreviation}
      categoryid={item.run.category}
      category={item.run.category}
      weblink={item.run.weblink}
    />
  );
  GameHeader = () => {
    return (
      <View>
        <ImageBackground
          style={styles.profileBG}
          source={{
            uri:
              "https://www.speedrun.com/themes/" +
              this.state.abbreviation +
              "/cover-256.png",
          }}
          opacity={0.3}
        >
          <View style={styles.profile}>
            <View style={styles.imagecontainer}>
              <Image
                source={{
                  uri:
                    "https://www.speedrun.com/themes/" +
                    this.state.abbreviation +
                    "/cover-256.png",
                }}
                style={styles.Image}
              ></Image>
            </View>
          </View>
          <View style={styles.userinfo}>
            <View style={styles.userinfoitem}>
              <Text style={styles.h1}>
                {this.state.game.names.international}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.game.categories.data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.button}>
              <Button
                title={item.name}
                style={styles.button}
                color={colors.primary}
                onPress={() => this.LoadRuns(item.id)}
              />
            </View>
          )}
        ></FlatList>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.variables}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.button}>
              <Button
                title={item.name}
                style={styles.button}
                color={colors.primary}
                //onPress={() => this.LoadRuns(item.id)}
              />
            </View>
          )}
        ></FlatList>
      </View>
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{
            alignSelf: "center",
            flex: 1,
            scaleX: 2,
            scaleY: 2,
          }}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item) => item.run.id}
            data={this.state.runs}
            renderItem={this.renderItem}
            ListHeaderComponent={this.GameHeader}
          ></FlatList>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  profileBG: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: colors.black,
  },
  profile: {
    flex: 1,
  },
  country: {
    flexDirection: "row",
  },
  flag: {
    height: 18,
    width: 25,
  },
  imagecontainer: {
    flex: 1,
    paddingTop: 30,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    width: 110,
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  socialbuttons: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  h1: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.darkgrey,
    fontSize: 15,
    fontWeight: "normal",
    alignSelf: "center",
  },
  headertext: {
    color: colors.darkgrey,
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 40,
  },
  pbs: {
    flex: 1,
    margin: 10,
  },
  runinfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  button: {
    margin: 20,
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

export default GameInfo;
