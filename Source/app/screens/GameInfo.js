import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import Run from "../components/Run";
import GameHeader from "../components/GameInfoComponents/GameHeader";

import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

class GameInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      id: "",
      abbreviation: "",
      name: "",
      game: [],
      url: "",
      runs: [],
      variables: [],
      categories: [],
      checked: 0,
      favourite: false,
      players: [],
    };
  }
  _isFavourite = async (id) => {
    const gameList = JSON.parse(await AsyncStorage.getItem("@MyGames"));
    if (gameList != null) {
      for (let GAME of gameList) {
        if (GAME.id == id) {
          this.setState({ favourite: true });
        }
      }
    }
  };
  _toggleFavourites = async () => {
    const games = await AsyncStorage.getItem("@MyGames");
    var gameList = JSON.parse(games);
    //Create game obj
    var game = {
      id: this.state.id,
      abbreviation: this.state.abbreviation,
    };
    if (gameList == null) {
      gameList = [];
    }
    if (!this.state.favourite) {
      //add game to list
      gameList.push(game);
      //Game added to list
      await AsyncStorage.setItem("@MyGames", JSON.stringify(gameList));
      this.setState({ favourite: true });
    } else {
      //Game got removed from list
      for (let GAME of gameList) {
        if (game.id == GAME.id) {
          gameList.splice(gameList.indexOf(GAME), 1);
        }
      }
      await AsyncStorage.setItem("@MyGames", JSON.stringify(gameList));
      this.setState({ favourite: false });
    }
  };
  async componentDidMount() {
    try {
      //Load gameId & abbreviation from react navigation
      const { id, abbreviation } = this.props.route.params;
      //Fav?
      this._isFavourite(id, abbreviation);
      //Get Game Data
      //Fetch Categories from Speedrun.com
      const url =
        "https://www.speedrun.com/api/v1/games/" +
        this.props.route.params.id +
        "?embed=categories";
      const response = await fetch(url);
      const data = await response.json();
      //Categories output
      var outCategories = [];
      //Filter Categories (type == Per-Game)
      for (var category of data.data.categories.data) {
        if (category.type == "per-game") {
          outCategories.push(category);
        }
      }
      //Select Default Category
      const selectedCategory = outCategories[0].id;
      //Fetch Variables
      this.LoadVariables(selectedCategory);
      //Set State
      this.setState({
        loading: false,
        game: data.data,
        name: data.data.names.international,
        id,
        abbreviation,
        categories: outCategories,
        checked: selectedCategory,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async LoadVariables(categoryid) {
    try {
      this.setState({ runs: [] });
      //Fetch Variables from Speedrun.com
      const variablesUrl =
        "https://www.speedrun.com/api/v1/categories/" +
        categoryid +
        "/variables?";
      const varResponse = await fetch(variablesUrl);
      const varData = await varResponse.json();
      //Get subcategories (is-subcategory===true)
      var outSubcategoies = [];
      //UrlBuild index
      var index = 1;
      //Url extension
      var urlExt =
        "https://www.speedrun.com/api/v1/leaderboards/" +
        this.props.route.params.id +
        "/category/" +
        categoryid;
      for (let subcategory of varData.data) {
        //Output Subcategory
        var outSubcategory = {
          id: "",
          name: "",
          values: [],
        };
        const str = subcategory["is-subcategory"];
        if (str == true) {
          //varData.data.is-subcategory == true
          //Load data into output
          outSubcategory.id = subcategory.id;
          outSubcategory.name = subcategory.name;
          //Get subcategory variables
          for (let variable in subcategory.values.values) {
            //Create output value
            var outValue = {
              label: "",
              id: "",
              rules: "",
              categoryid: "",
            };
            //Load outValue with data
            outValue.id = variable;
            outValue.label = subcategory.values.values[variable].label;
            outValue.rules = subcategory.values.values[variable].rules;
            outValue.categoryid = subcategory.id;
            //Load output to outSubcategory.values
            outSubcategory.values.push(outValue);
          }
          //Load subcategory into list
          outSubcategoies.push(outSubcategory);
          //Add url var
          urlExt = this.buildUrl(
            subcategory.id,
            subcategory.values.default,
            urlExt,
            index
          );
          //++ index
          index++;
        }
      }
      if (urlExt.includes("?")) {
        urlExt = urlExt + "&embed=players";
      } else {
        urlExt = urlExt + "?embed=players";
      }
      this.setState({ variables: outSubcategoies, checked: categoryid });
      this.LoadRuns(urlExt);
    } catch (error) {
      console.log(error);
    }
  }
  buildUrl = (id, value, url, index) => {
    try {
      //index = number of values loaded on the url
      if (index == 1) {
        return url + "?" + "var-" + id + "=" + value;
      } else {
        return url + "&" + "var-" + id + "=" + value;
      }
    } catch (error) {
      console.log(error);
    }
  };
  modifyUrl = (id, value) => {
    var url = this.state.url;
    var outUrl;
    if (url.includes(id)) {
      //Url contains id
      //Id lenght
      var lenght = id.length;
      var i = url.search(id) + lenght + 1;
      //i = value first char position
      var start = url.substr(0, i);
      var end = url.substr(i, url.length);
      if (end.includes("&")) {
        end = end.substr(end.indexOf("&"), url.length);
        outUrl = start + value + end;
      } else {
        outUrl = start + value;
      }
      this.LoadRuns(outUrl);
    } else {
      console.log("Error: Category Id not found on Url");
    }
  };
  async LoadRuns(url) {
    try {
      //Fetch Runs from Speedrun.com
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        runs: data.data.runs,
        url,
        players: data.data.players.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  renderRun = ({ item, index }) => {
    try {
      const name =
        this.state.players[index].names.international != null
          ? this.state.players[index].names.international
          : "null";
      return (
        <Run
          place={item.place}
          runner={name}
          time={item.run.times.primary}
          abbreviation={this.props.abbreviation}
          categoryid={item.run.category}
          weblink={item.run.weblink}
        />
      );
    } catch (error) {}
  };
  ListFooter = () => {
    return <View style={{ padding: 20 }}></View>;
  };
  GameHeader = () => {
    return (
      <View>
        <GameHeader
          abbreviation={this.state.abbreviation}
          name={this.state.name}
        >
          {this.state.favourite == true ? (
            <FontAwesome
              onPress={() => this._toggleFavourites()}
              name="heart"
              color={colors.white}
              size={30}
              style={{ paddingRight: 20 }}
            />
          ) : (
            <FontAwesome
              onPress={() => this._toggleFavourites()}
              name="heart-o"
              color={colors.white}
              size={30}
              style={{ paddingRight: 20 }}
            />
          )}
        </GameHeader>
        <View style={{ padding: 10 }}></View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              {this.state.checked == item.id ? (
                <TouchableOpacity
                  style={styles.selectedcategorybuttoncontainer}
                  onPress={() => this.LoadVariables(item.id)}
                >
                  <View style={styles.selectedcategorybuttontext}>
                    <Text style={styles.selectedtext}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.categorybuttoncontainer}
                  onPress={() => this.LoadVariables(item.id)}
                >
                  <View style={styles.categorybuttontext}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
        ></FlatList>
        <FlatList
          keyExtractor={(subcategory) => subcategory.id}
          data={this.state.variables}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FlatList
              keyExtractor={(item) => item.id}
              data={item.values}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  {this.state.url.includes(item.id) == true ? (
                    <View style={styles.button}>
                      <Button
                        title={item.label}
                        style={styles.button}
                        color={colors.primary}
                        onPress={() => this.modifyUrl(item.categoryid, item.id)}
                      />
                    </View>
                  ) : (
                    <View style={styles.button}>
                      <Button
                        title={item.label}
                        style={styles.button}
                        color={colors.darkgrey}
                        onPress={() => this.modifyUrl(item.categoryid, item.id)}
                      />
                    </View>
                  )}
                </View>
              )}
            ></FlatList>
          )}
        ></FlatList>
      </View>
    );
  };
  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ alignSelf: "center", flex: 1 }}
          size="large"
          color={colors.primary}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            // getItemLayout={(data, index) => ({
            //   length: 50,
            //   offset: 10 * index,
            //   index,
            // })}
            keyExtractor={(item) => item.run.id}
            data={this.state.runs}
            renderItem={this.renderRun}
            ListHeaderComponent={this.GameHeader}
            ListFooterComponent={this.ListFooter}
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
  h1: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  //Category Button
  categorybuttoncontainer: {
    backgroundColor: colors.white,
    height: 46,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
    justifyContent: "center",
    borderRadius: 10,
  },
  categorybuttontext: {
    paddingHorizontal: 10,
  },
  text: {
    color: colors.darkgrey,
    fontWeight: "bold",
    fontSize: 15,
  },
  //Selected Category Button
  selectedcategorybuttoncontainer: {
    backgroundColor: colors.white,
    height: 46,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
    justifyContent: "center",
    borderRadius: 10,
  },
  selectedcategorybuttontext: {
    paddingHorizontal: 10,
  },
  selectedtext: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    alignSelf: "center",
    height: 46,
    alignContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttontext: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 5,
    textAlignVertical: "center",
    paddingHorizontal: 20,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
});

export default GameInfo;
