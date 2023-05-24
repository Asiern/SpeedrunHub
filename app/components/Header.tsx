import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SquareButton } from "./SquareButton";
import { useNavigation } from "@react-navigation/native";

interface IHeader {
  title?: string;
}

function Header({ title }: IHeader): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <SquareButton icon="arrow-left" onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>{title}</Text>
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
    marginLeft: 10,
  },
});

export default memo(Header);
