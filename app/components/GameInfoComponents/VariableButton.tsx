import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { context } from "../../config/config";
import { colors } from "../../themes/theme";

export interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onPress: () => void;
}

const Button = ({ label, variant, onPress }: ButtonProps) => {
  const { config } = React.useContext(context)!;
  const { theme } = config;
  const color = variant === "primary" ? theme.colors.card : theme.colors.text;
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.card;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  varian: "default",
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
});
export default Button;
