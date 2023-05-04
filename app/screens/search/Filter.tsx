/**
  A component representing a filter button.
  @param label - The label to display on the button.
  @param onPress - The function to be called when the button is pressed.
  @param variant - The type of filter button to display ("add" or "remove"). Defaults to "add".
  @returns A JSX element containing the filter button.
*/

import React, { memo, useContext } from "react";
import { Text, StyleSheet } from "react-native";
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
FilterComponent.defaultProps = {
  variant: "add",
};

export const Filter = memo(FilterComponent);

function FilterComponent({ label, onPress, variant }: IFilter): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor:
            variant === "add" ? theme.colors.foreground : theme.colors.primary,
        },
        styles.container,
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
        style={[
          {
            color:
              variant === "add"
                ? theme.colors.primary
                : theme.colors.foreground,
          },
          styles.text,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...shadow,
    height: 35,
    paddingHorizontal: 6,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 5,
  },
  text: {
    fontFamily: "Poppins",
    marginHorizontal: 5,
  },
});
