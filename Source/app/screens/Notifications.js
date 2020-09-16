import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NotificationCard from "../components/NotificationCard";
import colors from "../config/colors";

const Notifications = (props) => {
  const { data } = props.route.params;
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <View>
            {item.status == "read" ? (
              <View>
                <NotificationCard
                  width={props.width}
                  text={item.text}
                  backgroundColor={colors.white}
                  color={colors.darkgrey}
                />
              </View>
            ) : (
              <View>
                <NotificationCard
                  width={props.width}
                  text={item.text}
                  backgroundColor={colors.primary}
                  color={colors.white}
                />
              </View>
            )}
          </View>
        )}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
});
export default Notifications;
