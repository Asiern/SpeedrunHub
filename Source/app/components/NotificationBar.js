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
import { h1, h3p } from "../themes/Styles"

const NotificationBar = (props) => {
    useEffect(() => {
    });
    return (
      <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <View>
            <Text style={[h1,{marginLeft:20}]}>Notifications</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Notifications", {
                data: props.data,
              })
            }
          >
            <Text style={[h3p,{marginRight:20}]}>View All</Text>
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
});
export default NotificationBar;
