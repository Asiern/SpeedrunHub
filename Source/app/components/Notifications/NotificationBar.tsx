import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "./NotificationCard";

import { colors, h1, h4p } from "../../themes/theme";
import { useNavigation } from "@react-navigation/native";

export interface NotificationBarProps {
  data: any[];
  width: number;
}

const NotificationBar = ({ data, width }: NotificationBarProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerConatiner}>
        <View>
          <Text style={[h1, { marginLeft: 20 }]}>Notifications</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Notifications", {
              data,
            })
          }
        >
          <Text style={[h4p, { marginRight: 20 }]}>View All</Text>
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
                  width={width}
                  text={item.text}
                  backgroundColor={colors.white}
                  color={colors.darkgrey}
                />
              </Animated.View>
            ) : (
              <Animated.View>
                <NotificationCard
                  width={width}
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
});
export default NotificationBar;
