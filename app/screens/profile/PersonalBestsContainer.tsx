import React, { useEffect, useState } from "react";
import { game, personalBest, user } from "../../hooks/types";
import { getPersonalBests } from "../../hooks";
import { ActivityIndicator, View } from "react-native";
import PersonalBests from "./PersonalBests";

interface IPersonalBestsContainer {
  user: user;
}

export function PersonalBestsContainer({
  user,
}: IPersonalBestsContainer): JSX.Element {
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

  return <PersonalBests games={games} pbs={pbs} />;
}
