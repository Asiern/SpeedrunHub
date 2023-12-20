import React, { memo } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { user } from "../../hooks/types";
import { Feather } from "@expo/vector-icons";
import { useConfig } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { shadow } from "../../themes/theme";

interface IUser {
  user: user;
  width: number;
}

function User({ user, width }: IUser): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.foreground, width },
        shadow,
      ]}
      testID="user-touchable"
      onPress={() => {
        navigation.navigate("Profile", { user });
      }}
    >
      {user.assets.image.uri ? (
        <Image
          style={[styles.image, { width, height: width }]}
          source={{ uri: user.assets.image.uri }}
          testID="user-image"
        />
      ) : (
        <View
          style={[styles.iconContainer, { width, height: width }]}
          testID="user-icon-container"
        >
          <Feather name="user" size={25} color={theme.colors.text} />
        </View>
      )}

      <Text style={styles.name}>{user.names.international}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {},
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    paddingVertical: 10,
    fontFamily: "Poppins",
  },
});
export default memo(User);
