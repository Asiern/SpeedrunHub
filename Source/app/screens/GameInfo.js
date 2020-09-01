import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import Run from "../components/Run";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      categories: [],
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
        id,
        abbreviation,
        categories: outCategories,
      });
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
      this.setState({ variables: outSubcategoies });
      this.LoadRuns(urlExt);
    } catch (error) {
      console.log(error);
    }
  }
  buildUrl = (id, value, url, index) => {
    if (index == 1) {
      return url + "?" + "var-" + id + "=" + value;
    } else {
      return url + "&" + "var-" + id + "=" + value;
    }
  };
  modifyUrl = (id, value) => {
    var url = this.state.url;
    if (url.includes(id)) {
      //Url contains id
      var i = url.search(id) + 1;
      var str = "sdhgasiudhaisudas";
      console.log(str.lenght);
      console.log(url.charAt(i));
      console.log(i);
      console.log(url);
      var notFound = false;
    } else {
      console.log("Error: Category Id not found on Url");
    }
    //Search for id on url and modify value
    //Load Runs
    //this.LoadRuns(url);
  };
  async LoadRuns(url) {
    try {
      this.setState({ loading: true });
      //Fetch Runs from Speedrun.com
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ runs: data.data.runs, loading: false, url });
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
        <View style={{ padding: 20 }}></View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.buttoncontainer}
              onPress={() => this.LoadVariables(item.id)}
            >
              <View style={styles.button}>
                <Text style={styles.buttontext}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
                <View style={styles.button}>
                  <Button
                    title={item.label}
                    style={styles.button}
                    color={colors.primary}
                    onPress={() => this.modifyUrl(item.categoryid, item.id)}
                  />
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
    alignSelf: "center",
    height: 46,
    alignContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttoncontainer: {},
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
