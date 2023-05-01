import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { context } from "../../config/config";
import { getGames, getUsers } from "../../hooks";
import SearchBar from "../../components/SearchBar";
import { Filters } from "./Filters";
import { gameResponse, usersResponse } from "../../hooks/types";
import { FlatList } from "react-native-gesture-handler";
import { UserCard } from "../../components";
import { SquareButton } from "../../components/SquareButton";
import { useNavigation } from "@react-navigation/native";

const INITIAL_FILTERS: string[] = ["games"];

async function search(
  setUsers: React.Dispatch<React.SetStateAction<usersResponse | null>>,
  setGames: React.Dispatch<React.SetStateAction<gameResponse | null>>,
  query: string,
  filters: string[]
) {
  let users: usersResponse | null = null;
  let games: gameResponse | null = null;

  // TODO define pagination

  if (filters.includes("users") || filters.length === 0)
    users = await getUsers(query, 10);

  if (filters.includes("games") || filters.length === 0)
    games = await getGames(query);

  setUsers(users);
  setGames(games);
}

export default function Search(props) {
  const params = props.route.params;
  const [users, setUsers] = useState<usersResponse | null>(null);
  const [games, setGames] = useState<gameResponse | null>(null);
  const [filters, setFilters] = useState<string[]>(INITIAL_FILTERS);
  const navigation = useNavigation();
  const { config } = useContext(context)!;
  const { theme } = config;

  useEffect(() => {
    if (params !== undefined) search(setUsers, setGames, params.query, filters);
  }, []);

  return (
    <View style={[styles.container]}>
      {/* // TODO  Set onSearch action*/}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SquareButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={{ marginRight: 5 }}
          variant="default"
        />
        <SearchBar
          onSearch={(query) => search(setUsers, setGames, query, filters)}
          initialValue={params.query}
        />
      </View>
      <Filters
        filters={["users", "games"]}
        initial={INITIAL_FILTERS}
        // TODO add search action
        onChange={(filters: string[]) =>
          search(setUsers, setGames, "query", filters)
        }
      />
      <FlatList
        style={{ marginVertical: 10 }}
        data={users?.data}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 5 }} />;
        }}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={{ paddingHorizontal: 30 }}>
              <UserCard user={item} />
            </View>
          );
        }}
        // numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafe",
    paddingTop: 40,
  },
});
