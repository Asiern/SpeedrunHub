import { Feather } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../themes/theme";
import Constants from "expo-constants";
import { GLYPHS } from "@expo/vector-icons/createIconSet";

export interface TopBarProps {
  onPress: () => void;
  label: String;
  variant: "light" | "dark" | "transparent";
  icon: GLYPHS;
}

export default function TopBar({ label, onPress, variant, icon }: TopBarProps) {
  const navigation = useNavigation();
  const goBack = StackActions.pop();
  var backgroundColor;
  var color;
  switch (variant) {
    case "light":
      backgroundColor = colors.white;
      color = colors.darkgrey;
      break;
    case "dark":
      backgroundColor = colors.black;
      color = colors.white;
      break;
    case "transparent":
      backgroundColor = "transparent";
      color = colors.darkgrey;
      break;
  }
  return (
    <View style={{ backgroundColor }}>
      <View style={styles.topbar}>
        <View style={styles.topbarleft}>
          <Feather
            onPress={() => navigation.dispatch(goBack)}
            name="arrow-left"
            color={variant == "dark" ? colors.white : colors.darkgrey}
            size={35}
            style={{ paddingLeft: 20 }}
          />
        </View>
        <View style={styles.topbarcenter}>
          <Text style={[styles.text, { color }]}>{label}</Text>
        </View>
        <View style={styles.topbarright}>
          <Feather
            onPress={() => onPress()}
            name={icon}
            color={variant == "dark" ? colors.white : colors.darkgrey}
            size={35}
            style={{ paddingRight: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
TopBar.defaultProps = {
  variant: "light",
};
const styles = StyleSheet.create({
  text: { alignSelf: "center", fontSize: 19, fontWeight: "bold" },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 15,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
