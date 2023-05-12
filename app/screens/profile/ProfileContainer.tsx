import React, { useEffect, useState } from "react";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Profile } from "./Profile";
import { game, personalBest } from "../../hooks/types";
import { getPersonalBests } from "../../hooks";
import { ActivityIndicator, View } from "react-native";

type ProfileProps = {
  route: RouteProp<MainNavigatorParamList, "Profile">;
  navigation: NavigationProp<MainNavigatorParamList, "Profile">;
};

export function ProfileContainer(props: ProfileProps): JSX.Element {
  const { user } = props.route.params;
  const [pbs, setPbs] = useState<personalBest[]>([]);
  const [games, setGames] = useState<game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function prepare() {
      const _pbs = await getPersonalBests(user.id);

      const _games: game[] = [];

      for (const pb of _pbs) {
        if (!_games.find((game) => game.id === pb.game.data.id)) {
          _games.push(pb.game.data);
        }
      }

      setGames(_games);
      setPbs(_pbs);
      setLoading(false);
    }
    prepare();
  }, []);

  if (loading)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator />
      </View>
    );

  return <Profile user={user} pbs={pbs} games={games} />;
}
