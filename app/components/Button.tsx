import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { shadow as shadowStyle } from "../themes/theme";
import { Feather } from "@expo/vector-icons";
import { useConfig } from "../hooks";

export interface ButtonProps {
  label: string;
  variant?: "default" | "primary";
  onPress: () => void;
  shadow?: boolean;
  icon?: string | null;
  centerContent?: boolean;
}

function Button({
  label,
  variant,
  onPress,
  shadow,
  icon,
  centerContent,
}: ButtonProps): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.foreground;
  const color =
    variant === "primary" ? theme.colors.foreground : theme.colors.headerText;
  return (
    <RectButton
      testID="button-touchable"
      style={[
        styles.container,
        { backgroundColor },
        variant === "primary" ? shadowStyle : shadow ? shadowStyle : null,
        centerContent ? { justifyContent: "center" } : null,
      ]}
      {...{ onPress }}
    >
      {icon !== null ? (
        // TODO fix icon prop type
        <Feather
          testID="button-icon"
          name={icon}
          size={15}
          style={{ marginRight: 10 }}
          color={color}
        />
      ) : null}
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
}

Button.defaultProps = {
  variant: "default",
  shadow: false,
  icon: null,
  centerContent: false,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  label: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
export default memo(Button);
