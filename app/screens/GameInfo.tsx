import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import VariableButton from "../components/GameInfoComponents/VariableButton";
import NotificationCard from "../components/Notifications/NotificationCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import Run from "../components/Run";
import GameHeader from "../components/GameInfoComponents/GameHeader";

import { colors } from "../themes/theme";
import { useConfig } from "../hooks";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { MainNavigatorParamList } from "../navigation/MainNavigator";

type GameInfoProps = {
  route: RouteProp<MainNavigatorParamList, "GameInfo">;
  navigation: NavigationProp<MainNavigatorParamList, "GameInfo">;
};

export default function GameInfo(props: GameInfoProps) {
  const { abbreviation, id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [game, setGame] = useState([]);
  const [url, setUrl] = useState("");
  const [runs, setRuns] = useState([]);
  const [variables, setVariables] = useState([]);
  const [categories, setCategories] = useState([]);
  const [players, setPlayers] = useState([]);
  const [checked, setChecked] = useState("");
  const { config } = useConfig();
  const { theme } = config;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //Load gameId & abbreviation from react navigation
        //Get Game Data
        //Fetch Categories from Speedrun.com
        const url =
          "https://www.speedrun.com/api/v1/games/" + id + "?embed=categories";
        const response = await fetch(url);
        const data = await response.json();
        setGame(data.data);
        //Categories output
        const outCategories = [];
        //Filter Categories (type == Per-Game)
        for (const category of data.data.categories.data) {
          if (category.type == "per-game") {
            outCategories.push(category);
          }
        }
        //Select Default Category
        if (outCategories.length == 0) {
          setLoading(false);
        } else {
          const selectedCategory = outCategories[0].id;
          LoadVariables(selectedCategory);
          setChecked(selectedCategory);
        }
        //Fetch Variables
        //Set State
        setName(data.data.names.international);
        setCategories(outCategories);
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  async function LoadVariables(categoryid: string) {
    try {
      setRuns([]);
      //Fetch Variables from Speedrun.com
      const variablesUrl =
        "https://www.speedrun.com/api/v1/categories/" +
        categoryid +
        "/variables?";
      const varResponse = await fetch(variablesUrl);
      const varData = await varResponse.json();
      //Get subcategories (is-subcategory===true)
      const outSubcategoies = [];
      //UrlBuild index
      let index = 1;
      //Url extension
      let urlExt =
        "https://www.speedrun.com/api/v1/leaderboards/" +
        id +
        "/category/" +
        categoryid;
      for (const subcategory of varData.data) {
        //Output Subcategory
        const outSubcategory = {
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
          for (const variable in subcategory.values.values) {
            //Create output value
            const outValue = {
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
          urlExt = buildUrl(
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
      setVariables(outSubcategoies);
      setChecked(categoryid);
      LoadRuns(urlExt);
    } catch (error) {
      console.log(error);
    }
  }
  const buildUrl = (id: string, value: string, url: string, index: number) => {
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
  const modifyUrl = (id: string, value: string) => {
    setRuns([]);
    let outUrl;
    //Url contains id
    //Id lenght
    const lenght = id.length;
    const i = url.search(id) + lenght + 1;
    //i = value first char position
    const start = url.substr(0, i);
    let end = url.substr(i, url.length);
    if (end.includes("&")) {
      end = end.substr(end.indexOf("&"), url.length);
      outUrl = start + value + end;
    } else {
      outUrl = start + value;
    }
    LoadRuns(outUrl);
  };
  async function LoadRuns(url: string) {
    try {
      //Fetch Runs from Speedrun.com
      const response = await fetch(url);
      const data = await response.json();
      setRuns(data.data.runs);
      setUrl(url);
      setPlayers(data.data.players.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const renderRun = ({ item, index }) => {
    try {
      let names = "";
      let i = index;
      for (const player of item.run.players) {
        if (player.name === undefined) {
          names += players[i].names.international + " ";
        } else {
          names += player.name + " ";
        }
        i++;
      }
      return (
        <Run
          place={item.place}
          runner={names}
          time={item.run.times.primary}
          categoryid={item.run.category}
          weblink={item.run.weblink}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  const ListFooter = () => {
    return <View style={{ padding: 20 }}></View>;
  };
  const ListHeader = () => {
    return (
      <View>
        <GameHeader
          abbreviation={abbreviation}
          name={name}
          uri={game.assets["cover-medium"].uri}
          date={game["release-date"]}
          id={id}
          platforms={[]}
        />
        <View style={{ padding: 10 }}></View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              {checked == item.id ? (
                <TouchableOpacity
                  style={[
                    styles.selectedcategorybuttoncontainer,
                    { backgroundColor: theme.colors.card },
                  ]}
                  onPress={() => LoadVariables(item.id)}
                >
                  <View style={styles.categorybuttontext}>
                    <Text
                      style={[styles.text, { color: theme.colors.primary }]}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.categorybuttoncontainer,
                    { backgroundColor: theme.colors.card },
                  ]}
                  onPress={() => LoadVariables(item.id)}
                >
                  <View style={styles.categorybuttontext}>
                    <Text style={[styles.text, { color: theme.colors.text }]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
        ></FlatList>
        <FlatList
          keyExtractor={(subcategory) => subcategory.id}
          data={variables}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FlatList
              keyExtractor={(item) => item.id}
              data={item.values}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  {url.includes(item.id) ? (
                    <View style={styles.button}>
                      <VariableButton
                        label={item.label}
                        onPress={() => modifyUrl(item.categoryid, item.id)}
                        variant={"primary"}
                      />
                    </View>
                  ) : (
                    <View style={styles.button}>
                      <VariableButton
                        label={item.label}
                        onPress={() => modifyUrl(item.categoryid, item.id)}
                        variant={"default"}
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

  if (loading) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", flex: 1 }}
        size="large"
        color={theme.colors.primary}
      />
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style={"light"}></StatusBar>
        <FlatList
          keyExtractor={(item) => item.run.id}
          data={runs}
          renderItem={renderRun}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator
                style={{ alignSelf: "center", flex: 1 }}
                size="large"
                color={theme.colors.primary}
              />
            ) : (
              <NotificationCard
                text="No categories found"
                color={theme.colors.card}
                backgroundColor={theme.colors.primary}
              />
            )
          }
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    alignContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
