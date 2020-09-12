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

const NotificationBar = (props) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const key = props.APIKey;
  useEffect(() => {
    let mounted = true;
    try {
      var url = "https://www.speedrun.com/api/v1/notifications";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.setRequestHeader("Host", "www.speedrun.com");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("X-API-Key", key);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && mounted) {
          response = JSON.parse(xhr.responseText);

          setData(response.data.slice(0, 10));
          setloading(false);
        }
      };
      xhr.send();
    } catch (error) {
      seterror(true);
    }
    return function cleanup() {
      mounted = false;
    };
  });
  //TODO fix rendering
  if (loading) {
    return <ActivityIndicator />;
  } else if (error) {
    return <Text>Something went wrong</Text>;
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Notifications", { data: data })
          }
        >
          <Text style={styles.headertext}>Notifications</Text>
        </TouchableOpacity>
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
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
});
export default NotificationBar;
