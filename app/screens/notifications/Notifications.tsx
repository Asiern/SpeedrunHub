import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { notificationResponse } from "../../hooks/types";
import { SquareButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../hooks";
import Constants from "expo-constants";
import { shadow } from "../../themes/theme";

interface INotification {
  notifications: notificationResponse | null | undefined;
}

function Notifications({ notifications }: INotification): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <SquareButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 30, marginVertical: 10 }}
        />
        <Text style={[styles.headerText, { color: theme.colors.primary }]}>
          Notifications
        </Text>
      </View>
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
