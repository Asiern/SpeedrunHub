import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { colors } from "../themes/theme";

export interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onPress: () => void;
}

const Button = ({ label, variant, onPress }: ButtonProps) => {
  const backgroundColor = variant === "primary" ? colors.primary : colors.light;
  const color = variant === "primary" ? colors.white : colors.darkgrey;
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = {
  varian: "default",
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
  },
});
export default Button;
