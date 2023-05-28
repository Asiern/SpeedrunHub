import React, { memo, useEffect, useState } from "react";
import Info from "./Info";
import { game, platform } from "../../../hooks/types";
import { ActivityIndicator } from "../../../components";
import { View } from "react-native";
import { getPlatform } from "../../../hooks";

interface IInfoContainer {
  game: game;
}

function InfoContainer({ game }: IInfoContainer): JSX.Element {
  const [platforms, setPlatforms] = useState<platform[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function prepare() {
      const _platforms: platform[] = [];
      for (const id of game.platforms) {
        const resp = await getPlatform(id);
        _platforms.push(resp.data);
      }
      setPlatforms(_platforms);
    }
    setLoading(true);
    prepare();
    setLoading(false);
  }, []);

  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return <Info {...{ game, platforms }} />;
}

export default memo(InfoContainer);
