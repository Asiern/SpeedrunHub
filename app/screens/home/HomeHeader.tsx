import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../../themes/theme";
import { useNavigation } from "@react-navigation/native";
import { context } from "../../config/config";
import { UserCard } from "./UserCard";
import { LoginButton } from "./LoginButton";

interface IHeaderButton {
  onPress: () => void;
}

const HEIGHT: number = 60;

function HeaderButton({ onPress }: IHeaderButton): JSX.Element {
  const { config } = useContext(context)!;
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

export default function HomeHeader(): JSX.Element {
  const navigation = useNavigation();
  const { config } = useContext(context)!;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        marginTop: 20,
      }}
    >
      <HeaderButton onPress={() => navigation.navigate("Settings")} />
      {config.logged === true ? <UserCard /> : <LoginButton />}
    </View>
  );
}
