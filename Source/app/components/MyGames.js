import React from "react";
import { StyleSheet, View,Dimestions, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "./GameCard";
import NotificationCard from "../components/Notifications/NotificationCard"
import colors from "../config/colors"
const {width} = Dimensions.get("screen")
export default function MyGames(props) {
  return (
    <View style={styles.conatiner}>
      <FlatList
        data={props.data}
        numColumns={3}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <NotificationCard  
            width={width}
            text={
              "Start searching for your favourite games and add them to MyGames."
            }
            backgroundColor={colors.primary}
            color={colors.white}
          />
      }
        renderItem={({ item }) => (
          <GameCard
            navigation={props.navigation}
            id={item.id}
            abbreviation={item.abbreviation}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});
