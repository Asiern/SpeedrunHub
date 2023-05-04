import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getGames, getUsers } from "../../hooks";
import SearchBar from "../../components/SearchBar";
import { Filters } from "./Filters";
import { game, gamesResponse, user, usersResponse } from "../../hooks/types";
import { ScrollView } from "react-native-gesture-handler";
import { UserCard } from "../../components";
import { SquareButton } from "../../components/SquareButton";
import { useNavigation } from "@react-navigation/native";
import Game from "./Game";
import { context } from "../../config/config";

const INITIAL_FILTERS: string[] = ["games"];
const FILTERS: string[] = ["users", "games"];

export default function Search(props) {
  const params = props.route.params;
  const [users, setUsers] = useState<usersResponse | null>(null);
  const [games, setGames] = useState<gamesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    params.query
  );
  const [filters, setFilters] = useState<string[]>(INITIAL_FILTERS);
  const navigation = useNavigation();
  const { config } = useContext(context)!;
  const { theme } = config;

  useEffect(() => {
    if (params !== undefined) search(setUsers, setGames, params.query, filters);
  }, [params.query, filters]);

  const search = useCallback(async function search(
    setUsers: React.Dispatch<React.SetStateAction<usersResponse | null>>,
    setGames: React.Dispatch<React.SetStateAction<gamesResponse | null>>,
    query: string,
    filters: string[]
  ) {
    setLoading(true);
    let users: usersResponse | null = null;
    let games: gamesResponse | null = null;
    let pagination: number;

    // Check if all filters are selected or no filter is selected and set pagination
    if (filters.length === 0 || FILTERS.length === filters.length)
      pagination = 10;
    else pagination = 20;

    // Fetch data based on selected filters
    if (filters.includes("users") || filters.length === 0)
      users = await getUsers(query, pagination);

    if (filters.includes("games") || filters.length === 0)
      games = await getGames(query, pagination);

    setUsers(users);
    setGames(games);
    // Set state and loading to false after fetching data
    setLoading(false);
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
        initial={INITIAL_FILTERS}
        onChange={(filters: string[]) => {
          setFilters(filters);
          search(setUsers, setGames, searchQuery ?? "", filters);
        }}
      />
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ paddingHorizontal: 30 }}>
          {loading && (
            <ActivityIndicator color={theme.colors.primary} size={30} />
          )}
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
    paddingTop: 40,
  },
  searchBar: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {},
});
