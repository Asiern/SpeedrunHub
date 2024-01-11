import React from "react";
import { StyleSheet, View, Share } from "react-native";
import { Header, SquareButton } from "../../components";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";
import { run } from "../../hooks/types";
import Info, { IInfoSquare } from "./Info";
import { getIconFromUrl, getTimeLabel } from "../../utils";

interface IRun {
  run: run;
  place: number;
  platform: string;
  category: string;
  values: { title: string; value: string | number; icon: string }[];
  verifier: string | null;
  players: string[];
}

const onShare = async (weblink: string) => {
  await Share.share({
    message: weblink,
  });
};

export default function Run({
  run,
  place,
  category,
  platform,
  values,
  verifier,
  players,
}: IRun): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  const runElements: IInfoSquare[] = [
    { title: "Rank", value: place, icon: "award" },
    {
      title: "Time",
      value: getTimeLabel(run.times.primary_t),
      icon: "calendar",
    },
    { title: "Date", value: run.date || "Undefined", icon: "calendar" },
    { title: "Platform", value: platform, icon: "monitor" },
  ];

  const leaderboardElements: IInfoSquare[] = [
    { title: "Category", value: category, icon: "award" },
  ];

  values.forEach((value) => {
    leaderboardElements.push(value);
  });

  const detailsElements: IInfoSquare[] = [
    { title: "Player", value: players.join(", "), icon: "user" },
    { title: "Submitted", value: run.submitted || "", icon: "user" },
  ];

  const videoElements: IInfoSquare[] | undefined = run.videos?.links.map(
    (link, i) => {
      return {
        title: `Video ${i + 1}`,
        value: link.uri,
        icon: getIconFromUrl(link.uri),
        link: link.uri,
      };
    }
  );

  if (verifier)
    detailsElements.push({
      title: "Verified",
      value: verifier,
      icon: "check-circle",
    });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        button={
          <SquareButton icon="share-2" onPress={() => onShare(run.weblink)} />
        }
      />
      <Info elements={runElements} title="RUN" />
      <Info elements={leaderboardElements} title="LEADERBOARD" />
      <Info elements={detailsElements} title="DETAILS" />
      {videoElements && <Info elements={videoElements} title="Videos" />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});
