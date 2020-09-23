import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "./NotificationCard";
import { ActivityIndicator } from "react-native-paper";
import colors from "../config/colors";
import Feather from "@expo/vector-icons/Feather";

const NotificationBar = (props) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const key = props.APIKey;
  useEffect(() => {
    let mounted = true;

    try {
      if (loading) {
        var url = "https://www.speedrun.com/api/v1/notifications";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Host", "www.speedrun.com");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-API-Key", key);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && mounted) {
            response = JSON.parse(xhr.responseText);

            setData(response.data);
            setloading(false);
          }
        };
        xhr.send();
      }
    } catch (error) {
      seterror(true);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data]);
  if (loading) {
    return <ActivityIndicator />;
  } else if (error) {
    return <Text>Something went wrong</Text>;
  } else if (data == undefined) {
    return (
      <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <View>
            <Text style={styles.headertext}>Notifications</Text>
          </View>
        </View>
        {key == null ? (
          <NotificationCard
            width={props.width}
            text={
              "API-Key not found, Please login using your API-Key if you want to receive notifications"
            }
            backgroundColor={colors.white}
            color={colors.darkgrey}
          />
        ) : (
          <NotificationCard
            width={props.width}
            text={
              "No notifications found. Make sure your API-Key is correct or that your Speedrun.com notifications settings are correct."
            }
            backgroundColor={colors.green}
            color={colors.white}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <View>
            <Text style={styles.headertext}>Notifications</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Notifications", {
                data: data,
              })
            }
          >
            <Text style={styles.h2}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
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
};

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
