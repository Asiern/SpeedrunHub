import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { shadow } from "../../themes/theme";
import { UserCard } from "./UserCard";
import { Feather } from "@expo/vector-icons";
import { Social } from "./Social";
import { useConfig } from "../../hooks";
import { personalBest, game, run } from "../../hooks/types";
import Run from "../../components/Run";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { MainNavigatorParamList } from "../../navigation/MainNavigator";

type ProfileProps = {
  route: RouteProp<MainNavigatorParamList, "Profile">;
  navigation: NavigationProp<MainNavigatorParamList, "Profile">;
};

export function Profile(props: ProfileProps): JSX.Element {
  const [pbs, setPBs] = useState<personalBest[] | null>(null);
  const [games, setGames] = useState<game[]>([]);
  const [runs, setRuns] = useState<run[]>([]);
  const { config } = useConfig();
  const { theme } = config;
  const { user } = props.route.params;

  // async function prepare() {
  //   try {
  //     if (user.names.international !== null) {
  //       // const data = await getUser(user.username);
  //       // setUserData(data);
  //       const _pbs: personalBest[] = await getPersonalBests(user.userid);
  //       const _games: game[] = [];
  //       // _pbs.forEach((pb)=>{if(games.)})
  //       setPBs(_pbs);
  //       // setRuns(runs);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  // useEffect(() => {
  //   prepare();
  // }, []);

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
