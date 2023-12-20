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

// const MAX_LEADERBOARD = 20;

function LeaderboardContainer({
  category,
  game,
  variables,
}: ILeaderboardContainer): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<leaderboard | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setLeaderboard(undefined);
    onEndReached();
    setLoading(false);
  }, [category, variables]);

  async function onEndReached() {
    const leaderboard = await getLeaderboard(game.id, category, variables);
    setLeaderboard(leaderboard.data);
    // setOffset(offset + MAX_LEADERBOARD);
  }

  if (loading) return <ActivityIndicator />;
  if (leaderboard === undefined) return <></>;

  return <Leaderboard {...{ leaderboard, onEndReached }} />;
}

export default LeaderboardContainer;
