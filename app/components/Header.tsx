import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SquareButton } from "./SquareButton";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../hooks";

interface IHeader {
  title?: string;
  button?: JSX.Element;
}

function Header({ title, button }: IHeader): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View style={styles.header}>
      <SquareButton
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        testID="back-button"
      />
      <Text
        style={[
          styles.headerText,
          { color: theme.colors.headerText, marginRight: button ? 10 : 0 },
        ]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {title}
      </Text>
      {button}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
});

export default memo(Header);
