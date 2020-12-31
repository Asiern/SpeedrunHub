import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { context } from "../../config/config";
import { colors } from "../../themes/theme";
const { width } = Dimensions.get("window");

type onChangeText = (text: string) => void;

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  theme?: "dark" | "light";
  onChangeText: onChangeText;
}
SearchBar.defaultProps = {
  theme: "light",
};
export function SearchBar({
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) {
  const { theme } = useContext(context);
  return (
    <View
      style={[
        styles.textinput,
        {
          borderColor: theme.colors.primary,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
        },
      ]}
    >
      <Feather name={"search"} size={18} color={theme.colors.primary} />
      <TextInput
        style={{ marginLeft: 10, flex: 1, color: theme.colors.text }}
        autoCapitalize={"none"}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: 70,
    width: width - 40,
    margin: 20,
    flexDirection: "row",
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
