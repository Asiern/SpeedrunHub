import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import colors from "../config/colors";
import Feather from "@expo/vector-icons/Feather";

const SettingsSection = (props) => {
  return (
    <TouchableOpacity
      onPress={
        props.navigateTO == null
          ? () => Linking.openURL(props.weblink)
          : () => props.navigation.navigate(props.navigateTO)
      }
    >
      <View
        style={[styles.container, { backgroundColor: props.backgroundColor }]}
      >
        <View style={styles.icon}>
          <Feather name={props.icon} color={props.accentColor} size={26} />
        </View>
        <View style={styles.textcontainer}>
          <Text style={[styles.text, { color: props.textPrimaryColor }]}>
            {props.title}
          </Text>
        </View>
        <View style={styles.icon}>
          <Feather name="arrow-right" color={props.accentColor} size={26} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  textcontainer: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SettingsSection;
