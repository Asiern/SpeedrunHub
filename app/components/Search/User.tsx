import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { shadow } from "../../themes/theme";
import { context } from "../../config/config";

export interface UserProps {
  username: string;
  userid: string;
}

export default function User({ username, userid }: UserProps) {
  const navigation = useNavigation();
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Profile", {
          username,
          userid,
        })
      }
      style={[styles.container, shadow, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.user}>
        {/* <View style={styles.imagecontainer}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" +
                username +
                "/image.png",
            }}
            style={[
              styles.Image,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.text,
              },
            ]}
          ></Image>
        </View>

        <View style={styles.textcontainer}> */}
        <Text style={[styles.usename, { color: theme.colors.text }]}>
          {username}
        </Text>
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  user: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  // Image: {
  //   height: 50,
  //   width: 50,
  //   borderWidth: 1,
  //   borderRadius: 30,
  // },
  // imagecontainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  // },
  // textcontainer: {
  //   flex: 2,
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  usename: { fontWeight: "bold", fontSize: 20 },
});
