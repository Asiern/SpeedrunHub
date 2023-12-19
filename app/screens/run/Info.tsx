import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../hooks";
import { shadow } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";

export interface IInfoSquare {
  title: string;
  value: string | number;
  icon?: string;
  index?: number;
}

function InfoSquare({ title, value, icon, index }: IInfoSquare): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View
      style={[
        styles.infoSquare,
        {
          backgroundColor: theme.colors.foreground,
          marginRight: 10,
          marginVertical: 5,
          marginLeft: index === 0 ? 30 : 0,
        },
        shadow,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {icon && (
          <Feather
            name={icon}
            style={{ marginRight: 2 }}
            size={15}
            color={theme.colors.headerText}
          />
        )}
        <Text
          style={[styles.infoSquareTitle, { color: theme.colors.headerText }]}
        >
          {title}
        </Text>
      </View>
      <Text style={[styles.infoSquareText, { color: theme.colors.text }]}>
        {value}
      </Text>
    </View>
  );
}

interface IInfo {
  title: string;
  elements: IInfoSquare[];
}

export default function Info({ elements, title }: IInfo): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <ScrollView
        style={{ flexDirection: "row" }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {elements.map((element, index) => (
          <InfoSquare key={index} {...element} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  title: {
    marginLeft: 30,
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  infoSquare: {
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  infoSquareTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  infoSquareText: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
});
