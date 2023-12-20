import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { notificationResponse } from "../../hooks/types";
import { Header } from "../../components";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../hooks";
import Constants from "expo-constants";
import { shadow } from "../../themes/theme";
import { useTranslation } from "react-i18next";

interface INotification {
  notifications: notificationResponse | null | undefined;
}

function Notifications({ notifications }: INotification): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  const { t } = useTranslation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title={t("notifications")} />
      {notifications?.data.map((notification) => {
        return (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.colors.foreground },
              shadow,
            ]}
            key={notification.id}
          >
            <Text style={[styles.text, { color: theme.colors.headerText }]}>
              {notification.text}
            </Text>
          </View>
        );
      })}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginLeft: 10,
  },
  card: {
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    fontFamily: "Poppins",
  },
});

export default memo(Notifications);
