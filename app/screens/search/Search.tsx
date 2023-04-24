import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../themes/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Games from "../../components/Search/Games";
import Users from "../../components/Search/Users";
import { StatusBar } from "expo-status-bar";

//AdMob
import AdMob from "../../config/admob.json";
import { AdMobBanner } from "expo-ads-admob";
import { context } from "../../config/config";
import { getUsers } from "../../hooks";
import SearchBar from "../../components/SearchBar";
import { Filters, IFilter } from "./Filters";
import { usersResponse } from "../../hooks/types";
import { ScrollView } from "react-native-gesture-handler";

async function search(
  setUsers: React.Dispatch<React.SetStateAction<usersResponse | null>>,
  filters: IFilter[],
  query: string
) {
  // TODO define pagination
  const users = await getUsers(query, 10);
  setUsers(users);
}

export default function Search(props) {
  const params = props.route.params;
  const [users, setUsers] = useState<usersResponse | null>(null);
  const { config } = useContext(context)!;

  useEffect(() => {
    if (params !== undefined) search(setUsers, [], params.query);
  }, [users]);

  return (
    <ScrollView style={[styles.container]}>
      {/* // TODO  Set onSearch action*/}
      <SearchBar
        onSearch={(query) => search(setUsers, [], query)}
        initialValue={params.query}
      />
      <Filters />
      {users?.data.map(({ names }) => {
        return (
          <View>
            <Text>{names.international}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafe",
    paddingTop: 40,
  },
});
