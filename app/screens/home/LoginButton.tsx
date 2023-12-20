import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useConfig } from "../../hooks";
import { shadow } from "../../themes/theme";

function LoginButton(): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      testID="login-button-touchable"
      onPress={() => {
        navigation.navigate("Login");
      }}
      style={[
        styles.container,
        shadow,
        { backgroundColor: theme.colors.foreground },
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        Login Now
      </Text>
      <Feather name="user" color={theme.colors.primary} size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});

export default memo(LoginButton);
