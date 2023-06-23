import React, { useEffect, useState } from "react";
import { game, leaderboard } from "../../../hooks/types";
import { selectedVariables } from "../GameInfo";
import { getLeaderboard } from "../../../hooks";
import Leaderboard from "./Leaderboard";
import { ActivityIndicator } from "../../../components";

interface ILeaderboardContainer {
  game: game;
  category: string; //Category id
  variables: selectedVariables;
}

function LeaderboardContainer({
  category,
  game,
  variables,
}: ILeaderboardContainer): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<leaderboard | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function prepare() {
      const leaderborad = await getLeaderboard(game.id, category, variables);
      setLeaderboard(leaderborad.data);
    }
    setLoading(true);
    setLeaderboard(undefined);
    prepare();
    setLoading(false);
  }, [category, variables]);

  if (loading) return <ActivityIndicator />;
  if (leaderboard === undefined) return <></>;

  return <Leaderboard {...{ leaderboard }} />;
}

export default LeaderboardContainer;
