import React, { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { UserCard } from "./UserCard";
import { Social } from "./Social";
import { useConfig } from "../../hooks";
import { SquareButton } from "../../components";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import Constants from "expo-constants";
import { CARD_HEIGHT, CARD_WIDTH } from "./GameCard";
import { PersonalBestsContainer } from "./PersonalBestsContainer";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";

const { width } = Dimensions.get("screen");

type ProfileProps = {
  route: RouteProp<MainNavigatorParamList, "Profile">;
  navigation: NavigationProp<MainNavigatorParamList, "Profile">;
};

export function Profile(props: ProfileProps): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const { user } = props.route.params;
  const [following, setFollowing] = useState<boolean>(
    config.following.includes(user.id)
  );
  const navigation = useNavigation();

  const follow = useCallback(() => {
    setConfig({ ...config, following: [...config.following, user.id] });
    setFollowing(true);
  }, []);

  const unFollow = useCallback(() => {
    const index = config.following.indexOf(user.id);
    const newArray: string[] = [
      ...config.following.slice(0, index),
      ...config.following.slice(index + 1, config.following.length),
    ];
    setConfig({ ...config, following: [...newArray] });
  }, []);

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
          style={{ width: 60, height: 60, marginRight: 5 }}
          variant="gray"
        />
        <UserCard user={user} />
        {config.user !== null && config.user.id !== user.id ? (
          <SquareButton
            testID="follow-square-button"
            icon="heart"
            onPress={following ? unFollow : follow}
            style={{ marginLeft: 5, height: 60, width: 60 }}
          />
        ) : null}
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
      <PersonalBestsContainer user={user} />
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
