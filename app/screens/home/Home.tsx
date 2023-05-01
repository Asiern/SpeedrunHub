import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Constants from "expo-constants";

import HomeHeader from "./HomeHeader";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  const navigator = useNavigation();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const onSearch = useCallback(
    (query: string | undefined) => {
      navigator.navigate("Search", { query: query });
    },
    [navigator]
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <View style={{ paddingHorizontal: 30 }}>
          <SearchBar
            onSearch={() => onSearch(searchValue)}
            onChangeText={setSearchValue}
          />
        </View>
        {/* <Notifications /> */}
      </View>
      <View style={{ flex: 1 }}>{/* <GameList /> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fafafe",
  },
});
