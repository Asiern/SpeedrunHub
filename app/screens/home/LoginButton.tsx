import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useConfig } from "../../hooks";

export function LoginButton(): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <View style={{ backgroundColor: theme.colors.background, height: 60 }}>
        <Feather name="arrow-right" color={theme.colors.primary} size={25} />
      </View>
    </TouchableOpacity>
  );
}
