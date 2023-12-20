import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../../hooks";
import { useTranslation } from "react-i18next";

interface IIntroduction {
  width: number;
}
export default function Introduction({ width }: IIntroduction): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.header, { color: theme.colors.primary }]}>
        SpeedrunHub
      </Text>
      <Text
        style={[
          styles.subHeader,
          { color: theme.colors.headerText, marginTop: 5 },
        ]}
      >
        {t("welcome", { ns: "glossary" })}
      </Text>
      <Text
        style={[
          styles.text,
          { color: theme.colors.headerText, textAlign: "justify" },
        ]}
      >
        {t("screens.onboarding.introduction")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
