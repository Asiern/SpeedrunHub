/**
  A component representing a filter button.
  @param label - The label to display on the button.
  @param onPress - The function to be called when the button is pressed.
  @param variant - The type of filter button to display ("add" or "remove"). Defaults to "add".
  @returns A JSX element containing the filter button.
*/

import React, { useContext } from "react";
import { Text } from "react-native";
import { context } from "../../config/config";
import { shadow } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IFilter {
  label: string;
  onPress: () => void;
  variant?: "add" | "remove";
}

/**
  Set the default variant of the Filter component to "add".
*/
Filter.defaultProps = {
  variant: "add",
};

export function Filter({ label, onPress, variant }: IFilter): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <TouchableOpacity
      style={[
        {
          height: 35,
          paddingHorizontal: 6,
          borderRadius: 10,
          backgroundColor:
            variant === "add" ? theme.colors.foreground : theme.colors.primary,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          marginRight: 5,
        },
        shadow,
      ]}
      onPress={onPress}
    >
      <Feather
        name={variant === "add" ? "plus" : "x"}
        color={
          variant === "add" ? theme.colors.primary : theme.colors.foreground
        }
        size={15}
      />
      <Text
        style={{
          fontFamily: "Poppins",
          marginHorizontal: 5,
          color:
            variant === "add" ? theme.colors.primary : theme.colors.foreground,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
