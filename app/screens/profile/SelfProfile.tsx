import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { context } from "../../config/config";
import { shadow } from "../../themes/theme";
import { UserCard } from "./UserCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Social } from "./Social";
import { user } from "../../types";
import { getUser, getRuns } from "../../hooks";
import { run } from "../../hooks/types";

export function SelfProfile(): JSX.Element {
  const [userData, setUserData] = useState<user | null>(null);
  const [runs, setRuns] = useState<run[]>([]);
  const { config, setConfig } = useContext(context)!;
  const { theme } = config;
  const navigation = useNavigation();

  async function prepare() {
    try {
      if (config.user.username !== null) {
        // const data = await getUser(config.user.username);
        // setUserData(data);
        const runs = await getRuns(config.user.userid);
        setRuns(runs);
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
          {runs.map((run) => {
            return (
              <View
                key={run.id}
                style={[
                  {
                    backgroundColor: theme.colors.foreground,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 5,
                    height: 60,
                  },
                  shadow,
                ]}
              >
                <Text>{run.id}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
