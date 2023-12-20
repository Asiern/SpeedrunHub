import React, { useEffect, useState } from "react";
import Run from "./Run";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { getCategory, getPlatform, getUser, getVariable } from "../../hooks";
import { ActivityIndicator } from "../../components";

type RunProps = {
  route: RouteProp<MainNavigatorParamList, "RunInfo">;
  navigation: NavigationProp<MainNavigatorParamList, "RunInfo">;
};

type value = {
  title: string;
  value: string;
  icon: string;
};

export default function RunContainer(props: RunProps): JSX.Element {
  const { route } = props;
  const { run, place } = route.params;
  const [category, setCategory] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [examiner, setExaminer] = useState<string | null>("");
  const [values, setValues] = useState<value[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const category = getCategory(run.category);
      const platform = getPlatform(run.system.platform);
      const examiner = getUser(run.status.examiner || "");

      // Set players
      run.players.map(async (player) => {
        if (player.rel === "guest" && player.name)
          setPlayers([...players, player.name]);
        else if (player.id)
          getUser(player.id).then((user) => {
            if (user.names.international || user.names.japanese)
              setPlayers([
                ...players,
                user.names.international || user.names.japanese || "",
              ]);
          });
      });

      Promise.all([category, platform, examiner]).then((values) => {
        setCategory(values[0].data.name);
        setPlatform(values[1].data.name);
        setExaminer(values[2].names.international || null);
      });

      Object.keys(run.values).forEach(async (key) => {
        const variable = await getVariable(key);
        setValues([
          ...values,
          {
            title: variable.name,
            value: variable.values.values[run.values[key]].label,
            icon: "tag",
          },
        ]);
      });
    };

    fetch().then(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <Run
      {...{
        category,
        platform,
        place,
        run,
        values,
        verifier: examiner,
        players,
      }}
    />
  );
}
