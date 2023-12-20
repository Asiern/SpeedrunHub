import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import User from "./User";

export interface RunnersProps {
  runners: runnerProps[];
}
export interface runnerProps {
  userid: string;
  username: string;
}

const { width } = Dimensions.get("window");
export default function Runners({ runners }: RunnersProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={1}
      >
        {runners.map((item) => {
          return (
            <View style={{ width, paddingVertical: 10 }} key={item.userid}>
              <User username={item.username} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    paddingVertical: 20,
  },
});
