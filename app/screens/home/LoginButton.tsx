import { TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { context } from "../../config/config";
import { Feather } from "@expo/vector-icons";

export function LoginButton(): JSX.Element {
  const navigation = useNavigation();
  const { config } = useContext(context)!;
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
