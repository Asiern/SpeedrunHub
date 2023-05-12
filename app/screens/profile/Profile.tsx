import React from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { UserCard } from "./UserCard";
import { Social } from "./Social";
import { useConfig } from "../../hooks";
import { game, personalBest, user } from "../../hooks/types";
import { SquareButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import PersonalBests from "./PersonalBests";
import Constants from "expo-constants";
import { CARD_HEIGHT, CARD_WIDTH } from "./GameCard";

const { width } = Dimensions.get("screen");

interface IProfile {
  user: user;
  pbs: personalBest[];
  games: game[];
}

export function Profile({ user, pbs, games }: IProfile): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  const navigation = useNavigation();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: 10,
      }}
    >
      <View style={styles.header}>
        <SquareButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={{ width: 60, height: 60, marginRight: 10 }}
          variant="gray"
        />
        <UserCard user={user} />
      </View>
      <View style={styles.social}>
        <View style={{ marginRight: 10, flex: 1 }}>
          <Social user={user} />
        </View>
        <SquareButton
          icon="more-horizontal"
          onPress={() => null}
          style={styles.moreButton}
          variant="primary"
        />
      </View>
      <PersonalBests games={games} pbs={pbs} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: Constants.statusBarHeight,
  },
  social: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  moreButton: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gameScrollviewContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginBottom: 10,
  },
  runScrollView: {
    width,
  },
  runContainer: {
    width,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});
