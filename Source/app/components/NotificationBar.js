import React, { useRef } from "react";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import NotificationCard from "./NotificationCard";

const NotificationBar = (props) => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, i) => i}
        data={data}
        renderItem={({ item }) => (
          <Animated.View>
            <NotificationCard width={props.width} />
          </Animated.View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default NotificationBar;
