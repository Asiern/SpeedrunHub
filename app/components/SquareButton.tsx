import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { shadow } from "../themes/theme";
import { context } from "../config/config";

interface ISquareButton {
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "primary" | "default";
}

SquareButton.defaultProps = {
  variant: "default",
};

export function SquareButton({
  icon,
  onPress,
  style,
  variant,
}: ISquareButton): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor:
            variant === "primary"
              ? theme.colors.primary
              : theme.colors.foreground,
          justifyContent: "center",
          height: 50,
          width: 50,
          alignItems: "center",
          borderRadius: 12,
        },
        shadow,
        style,
      ]}
      onPress={onPress}
    >
      <Feather
        name={icon}
        size={25}
        color={
          variant === "primary" ? theme.colors.foreground : theme.colors.primary
        }
      />
    </TouchableOpacity>
  );
}
