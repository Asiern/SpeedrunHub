import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "./NotificationCard";

import { colors, h1, h4p } from "../../themes/theme";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../../hooks";

export interface NotificationBarProps {
  data: any[];
  width: number;
}

function NotificationBar({ data, width }: NotificationBarProps): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;

  return (
    <View style={styles.container}>
      <View style={styles.headerConatiner}>
        <View>
          <Text style={[h1, { marginLeft: 20, color: theme.colors.text }]}>
            Notifications
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Notifications", {
              data,
            })
          }
        >
          <Text style={[h4p, { marginRight: 20, color: theme.colors.primary }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        pagingEnabled
        renderItem={({ item }) => (
          <View>
            {item.status == "read" ? (
              config.notifications.unread ? null : (
                <NotificationCard
                  width={width}
                  text={item.text}
                  backgroundColor={theme.colors.card}
                  color={colors.darkgrey}
                />
              )
            ) : (
              <NotificationCard
                width={width}
                text={item.text}
                backgroundColor={theme.colors.primary}
                color={colors.white}
              />
            )}
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerConatiner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default NotificationBar;
