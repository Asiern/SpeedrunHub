import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  AsyncStorage,
} from "react-native";
import NotificationCard from "./NotificationCard";
import { ActivityIndicator } from "react-native-paper";
import colors from "../config/colors";
import API from "../config/API";

const NotificationBar = (props) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [key, setkey] = useState(API.key);

  //TODO get APIkey via AsyncStorage
  useEffect(() => {
    let mounted = true;
    var url = "https://www.speedrun.com/api/v1/notifications";
    if (key != "") {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.setRequestHeader("Host", "www.speedrun.com");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("X-API-Key", key);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && mounted) {
          setData(JSON.parse(xhr.responseText));
          setloading(false);
        }
      };
      xhr.send();
    } else {
      setloading(false);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  } else if (key == "") {
    return (
      <NotificationCard
        width={props.width}
        text={"API Key not found"}
        backgroundColor={colors.primary}
        color={colors.white}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data.data}
          renderItem={({ item }) => (
            <View>
              {item.status == "read" ? (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.id}
                    backgroundColor={colors.white}
                    color={colors.darkgrey}
                  />
                </Animated.View>
              ) : (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.id}
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
});
export default NotificationBar;
