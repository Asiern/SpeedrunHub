import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { shadow as shadowStyle } from "../themes/theme";
import { useConfig } from "../hooks";

interface ISquareButton {
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "primary" | "default" | "gray";
  testID?: string;
  shadow?: boolean;
}

export function SquareButton({
  icon,
  onPress,
  style,
  variant = "default",
  testID = undefined,
  shadow = true,
}: ISquareButton): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      testID={testID ?? "touchable"}
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
        shadow ? shadowStyle : null,
        style,
      ]}
      onPress={onPress}
    >
      <Feather
        name={icon}
        size={25}
        color={
          variant === "primary"
            ? theme.colors.foreground
            : variant === "default"
            ? theme.colors.primary
            : theme.colors.text
        }
      />
    </TouchableOpacity>
  );
}
