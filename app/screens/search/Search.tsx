import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getGames, getUsers } from "../../hooks";
import SearchBar from "../../components/SearchBar";
import { Filters } from "./Filters";
import { game, gamesResponse, user, usersResponse } from "../../hooks/types";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, UserCard } from "../../components";
import { SquareButton } from "../../components/SquareButton";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import Game from "./Game";
import Constants from "expo-constants";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";
import crashlytics from "@react-native-firebase/crashlytics";

const INITIAL_FILTERS: string[] = ["games"];
const FILTERS: string[] = ["users", "games"];

type SearchProps = {
  route: RouteProp<MainNavigatorParamList, "Search">;
  navigation: NavigationProp<MainNavigatorParamList, "Search">;
};

export default function Search(props: SearchProps): JSX.Element {
  const params = props?.route?.params;
  const [users, setUsers] = useState<usersResponse | null>(null);
  const [games, setGames] = useState<gamesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    params.query
  );
  const [filters, setFilters] = useState<string[]>(
    params.filters ?? INITIAL_FILTERS
  );
  const navigation = useNavigation();

  useEffect(() => {
    crashlytics().log("Search screen Mounted");
    if (params !== undefined && params.query !== "") {
      crashlytics().log(
        "Search screen Mounted: Search function called on mount"
      );
      search(setUsers, setGames, params.query, filters);
    }
  }, [params.query, filters]);

  const search = useCallback(async function search(
    setUsers: React.Dispatch<React.SetStateAction<usersResponse | null>>,
    setGames: React.Dispatch<React.SetStateAction<gamesResponse | null>>,
    query: string,
    filters: string[]
  ) {
    try {
      crashlytics().log("Search");
      setLoading(true);
      let users: usersResponse | null = null;
      let games: gamesResponse | null = null;
      let pagination: number;

      // Check if all filters are selected or no filter is selected and set pagination
      if (filters.length === 0 || FILTERS.length === filters.length) {
        crashlytics().log("Search: All filters selected");
        pagination = 10;
      } else {
        pagination = 20;
        crashlytics().log(`Search: ${filters} filters selected`);
      }

      // Fetch data based on selected filters
      if (filters.includes("users") || filters.length === 0)
        users = await getUsers(query, pagination);

      if (filters.includes("games") || filters.length === 0)
        games = await getGames(query, pagination);

      crashlytics().log("Search: Data fetched");
      setUsers(users);
      setGames(games);

      // Set state and loading to false after fetching data
      setLoading(false);
    } catch (e) {
      console.error(e);
      crashlytics().recordError(e);
    }
  },
  []);

  return (
    <View style={[styles.container]}>
      <View style={styles.searchBar}>
        <SquareButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={{ marginRight: 5 }}
          variant="default"
        />
        <SearchBar
          onSearch={() =>
            search(setUsers, setGames, searchQuery ?? "", filters)
          }
          initialValue={params.query}
          onChangeText={setSearchQuery}
        />
      </View>
      <Filters
        filters={FILTERS}
        initial={params.filters ?? INITIAL_FILTERS}
        onChange={(filters: string[]) => {
          setFilters(filters);
          search(setUsers, setGames, searchQuery ?? "", filters);
        }}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          {loading && <ActivityIndicator />}
          {!loading &&
            users?.data.map((user: user, index: number) => {
              return (
                <View key={index} style={{ marginTop: 5 }}>
                  <UserCard user={user} />
                </View>
              );
            })}
          {!loading &&
            games?.data.map((game: game) => {
              return <Game game={game} key={game.id} />;
            })}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafe",
    paddingTop: Constants.statusBarHeight + 20,
  },
  searchBar: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {},
});
