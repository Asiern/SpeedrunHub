import React, { useEffect, useState } from "react";
import GameInfo from "./GameInfo";
import { game } from "../../hooks/types";
import { getGame } from "../../hooks";
import { ActivityIndicator } from "../../components";
import { StyleSheet, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";

type GameInfoProps = {
  route: RouteProp<MainNavigatorParamList, "GameInfo">;
  navigation: NavigationProp<MainNavigatorParamList, "GameInfo">;
};

function GameInfoContainer(props: GameInfoProps): JSX.Element {
  const [game, setGame] = useState<game>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = props.route.params;

  useEffect(() => {
    async function prepare() {
      setLoading(true);
      const _game = await getGame(id);
      setGame(_game.data);
    }
    prepare();
    setLoading(false);
  }, []);

  if (loading || game === undefined)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );

  return <GameInfo game={game} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameInfoContainer;
