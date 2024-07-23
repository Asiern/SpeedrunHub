import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import HomeHeader from "./HomeHeader";
import SearchBar from "../../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import GameList from "./GameList";
import Following from "./Following";

export default function Home(): JSX.Element {
  const navigator = useNavigation();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const onSearch = useCallback(
    (query: string | undefined) => {
      navigator.navigate("Search", { query: query });
    },
    [navigator]
  );

  return (
    <ScrollView style={styles.container}>
      <HomeHeader />
      <View style={{ paddingHorizontal: 30, marginTop: 5 }}>
        <SearchBar
          onSearch={() => onSearch(searchValue)}
          onChangeText={setSearchValue}
        />
      </View>
      <GameList />
      <Following />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fafafe",
  },
});
