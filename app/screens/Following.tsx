import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useConfig } from "../hooks";
import { SquareButton, UserContainer } from "../components";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const { width } = Dimensions.get("screen");

const N_CARDS_SLIDE = 3;
const CARD_GAP = 6;
const CARD_WIDTH: number = (width - 2 * 30 - 2 * CARD_GAP) / N_CARDS_SLIDE;

function Following(): JSX.Element {
  const { config } = useConfig();
  const { theme, following } = config;
  const navigation = useNavigation();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <SquareButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Following</Text>
      </View>
      <View style={styles.games}>
        {following?.map((id: string) => {
          return <UserContainer id={id} width={CARD_WIDTH} key={id} />;
        })}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  header: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginLeft: 10,
  },
  games: {
    marginHorizontal: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});

export default memo(Following);
