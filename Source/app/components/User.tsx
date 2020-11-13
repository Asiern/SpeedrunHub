import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";

export interface UserProps {
  username: string;
  userid: string;
}

export default function User(props: UserProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Profile", {
          username: props.username,
          userid: props.userid,
        })
      }
      style={styles.container}
    >
      <View style={styles.user}>
        <View style={styles.imagecontainer}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" +
                props.username +
                "/image.png",
            }}
            style={styles.Image}
          ></Image>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.usename}>{props.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 5,
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
  Image: {
    height: 50,
    width: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  textcontainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  usename: { color: colors.darkgrey, fontWeight: "bold", fontSize: 20 },
  iconcontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
