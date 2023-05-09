import React, { memo } from "react";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../../themes/theme";
import { useNavigation } from "@react-navigation/native";
import { UserCard } from "../../components/UserCard";
import { LoginButton } from "./LoginButton";
import { useConfig } from "../../hooks";

interface IHeaderButton {
  onPress: () => void;
}

const HEIGHT = 60;

function HeaderButton({ onPress }: IHeaderButton): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      style={[
        {
          width: HEIGHT,
          height: HEIGHT,
          backgroundColor: theme.colors.foreground,
          borderRadius: 10,
          justifyContent: "center",
        },
        shadow,
      ]}
      onPress={onPress}
    >
      <Feather
        name="sliders"
        size={25}
        style={{ color: theme.colors.primary, alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}

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
      <HeaderButton onPress={() => navigation.navigate("Settings")} />
      {config.logged === true && config.user !== null ? (
        <UserCard user={config.user} />
      ) : (
        <LoginButton />
      )}
    </View>
  );
}

export default memo(HomeHeader);
