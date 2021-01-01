import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import { PalleteSquare } from "../../components/PalleteSquare";
import { context } from "../../config/config";
import { colors } from "../../themes/theme";

const themeColors = [
  "#26C6DA",
  "#80D8FF",
  "#4CAF50",
  "#FF8A65",
  "#F06292",
  "#c62828",
  "#AB47BC",
  "#448AFF",
];

const { width } = Dimensions.get("window");
async function saveTheme(theme) {
  await AsyncStorage.setItem("@Theme", JSON.stringify(theme));
}
function onPress(dark, color, setTheme) {
  if (dark) {
    var theme = {
      dark: true,
      colors: {
        primary: color,
        background: "#121212",
        card: "#000",
        text: "#fff",
        border: "rgb(199, 199, 204)",
        notification: "rgb(255, 69, 58)",
      },
    };
  } else {
    var theme = {
      dark: false,
      colors: {
        primary: color,
        background: "#ededed",
        card: "#fff",
        text: "#242c37",
        border: "rgb(199, 199, 204)",
        notification: "rgb(255, 69, 58)",
      },
    };
  }
  setTheme(theme);
  saveTheme(theme);
}
export function ThemeSettings() {
  const { theme, setTheme } = useContext(context);
  var backgroundColor = theme.dark ? "#000" : colors.light;
  var color = theme.dark ? "#fff" : "#000";
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.dark}>
        <TouchableOpacity
          onPress={() => onPress(false, theme.colors.primary, setTheme)}
        >
          <Feather name={"sun"} size={35} color={color} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(true, theme.colors.primary, setTheme)}
        >
          <Feather name={"moon"} size={35} color={color} />
        </TouchableOpacity>
      </View>
      <View style={styles.colors}>
        {themeColors.map((item, index) => {
          return item === theme.colors.primary ? (
            <PalleteSquare
              color={item}
              key={index}
              selected
              onPress={() => onPress(theme.dark, item, setTheme)}
            />
          ) : (
            <PalleteSquare
              color={item}
              key={index}
              selected={false}
              onPress={() => onPress(theme.dark, item, setTheme)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  dark: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    width,
  },
  colors: {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
    flexWrap: "wrap",
  },
});
