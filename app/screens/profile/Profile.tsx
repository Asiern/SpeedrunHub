import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { context } from "../../config/config";
import { shadow } from "../../themes/theme";
import { UserCard } from "./UserCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Social } from "./Social";
import { getUser, getRuns, getPersonalBests } from "../../hooks";
import { PersonalBest, game, run } from "../../hooks/types";
import Run from "../../components/Run";

export function Profile(props): JSX.Element {
  const [pbs, setPBs] = useState<PersonalBest[] | null>(null);
  const [games, setGames] = useState<game[]>([]);
  const [runs, setRuns] = useState<run[]>([]);
  const { config, setConfig } = useContext(context)!;
  const { theme } = config;
  const navigation = useNavigation();
  const { user } = props.route.params;

  async function prepare() {
    try {
      if (user.username !== null) {
        // const data = await getUser(user.username);
        // setUserData(data);
        const _pbs: PersonalBest[] = await getPersonalBests(user.userid);
        const _games: game[] = [];
        // _pbs.forEach((pb)=>{if(games.)})
        setPBs(_pbs);
        // setRuns(runs);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: 10,
      }}
    >
      <View style={{ margin: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <UserCard />
          {/* <TouchableOpacity
          style={[
            {
              width: 60,
              height: 60,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              justifyContent: "center",
            },
            shadow,
          ]}
          onPress={logout}
          >
          <Feather
          name="user-x"
          size={25}
          style={{ color: theme.colors.foreground, alignSelf: "center" }}
          />
        </TouchableOpacity> */}
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ marginRight: 10, flex: 1 }}>
            <Social />
          </View>
          <TouchableOpacity
            style={[
              {
                backgroundColor: theme.colors.primary,
                height: 50,
                width: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              },
              shadow,
            ]}
          >
            <Feather
              name="more-horizontal"
              size={20}
              color={theme.colors.foreground}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          {runs.map((run, i) => {
            if (i === 0) console.log(run);
            return <Run run={run} key={run.id} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}
