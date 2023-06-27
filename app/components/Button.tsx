import React, { memo } from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
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
  style?: ViewStyle;
  disabled?: boolean;
  iconPosition?: "left" | "right";
}

function Button({
  label,
  variant,
  onPress,
  shadow,
  icon,
  centerContent,
  style,
  disabled = false,
  iconPosition = "left",
}: ButtonProps): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.foreground;
  const color =
    variant === "primary" ? theme.colors.foreground : theme.colors.headerText;
  return (
    <RectButton
      enabled={!disabled}
      testID="button-touchable"
      style={[
        styles.container,
        {
          backgroundColor,
        },
        variant === "primary" ? shadowStyle : shadow ? shadowStyle : null,
        centerContent ? { justifyContent: "center" } : null,
        style,
      ]}
      {...{ onPress }}
    >
      {iconPosition === "left" ? null : (
        <Text
          style={[
            styles.label,
            { color: disabled ? theme.colors.text : color },
          ]}
        >
          {label}
        </Text>
      )}
      {icon !== null ? (
        // TODO fix icon prop type
        <Feather
          testID="button-icon"
          name={icon}
          size={15}
          style={{
            marginRight: iconPosition === "left" ? 10 : 0,
            marginLeft: iconPosition === "right" ? 10 : 0,
          }}
          color={disabled ? theme.colors.text : color}
        />
      ) : null}
      {iconPosition === "right" ? null : (
        <Text
          style={[
            styles.label,
            { color: disabled ? theme.colors.text : color },
          ]}
        >
          {label}
        </Text>
      )}
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
