import React,{useEffect} from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "./NotificationCard";

import colors from "../config/colors";

const NotificationBar = (props) => {
    useEffect(() => {
    });
    return (
      <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <View>
            <Text style={styles.headertext}>Notifications</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Notifications", {
                data: props.data,
              })
            }
          >
            <Text style={styles.h2}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={props.data}
          pagingEnabled
          renderItem={({ item }) => (
            <View>
              {item.status == "read" ? (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.text}
                    backgroundColor={colors.white}
                    color={colors.darkgrey}
                  />
                </Animated.View>
              ) : (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.text}
                    backgroundColor={colors.primary}
                    color={colors.white}
                  />
                </Animated.View>
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
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  h2: {
    color: colors.primary,
    marginRight: 20,
    fontSize: 17,
  },
});
export default NotificationBar;
