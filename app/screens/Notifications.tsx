import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import NotificationCard from "../components/Notifications/NotificationCard";
import { colors } from "../themes/theme";
import { useConfig } from "../hooks";

function Notifications(): JSX.Element {
  const { data } = useRoute().params;
  const { config } = useConfig();
  const { theme } = config;
  const { width } = Dimensions.get("window");

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={"auto"}></StatusBar>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <View>
            {item.status == "read" ? (
              config.notifications.unread ? null : (
                <View>
                  <NotificationCard
                    width={width}
                    text={item.text}
                    backgroundColor={theme.colors.card}
                    color={theme.colors.text}
                  />
                </View>
              )
            ) : (
              <View>
                <NotificationCard
                  width={width}
                  text={item.text}
                  backgroundColor={theme.colors.primary}
                  color={colors.white}
                />
              </View>
            )}
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Notifications;
