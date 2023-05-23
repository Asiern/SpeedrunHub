import React, { memo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserCard, SquareButton } from "../../components";
import { LoginButton } from "./LoginButton";
import { useConfig } from "../../hooks";

const HEIGHT = 60;

function HomeHeader(): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        marginTop: 10,
      }}
    >
      <SquareButton
        onPress={() => navigation.navigate("Settings")}
        icon="sliders"
        style={{ width: HEIGHT, height: HEIGHT, marginRight: 5 }}
      />
      {config.logged === true && config.user !== null ? (
        <UserCard user={config.user} />
      ) : (
        <LoginButton />
      )}
      {config.key !== null ? (
        <SquareButton
          testID="notifications-square-button"
          icon="bell"
          style={{ width: HEIGHT, height: HEIGHT, marginLeft: 5 }}
          onPress={() => navigation.navigate("Notifications")}
        />
      ) : null}
    </View>
  );
}

export default memo(HomeHeader);
