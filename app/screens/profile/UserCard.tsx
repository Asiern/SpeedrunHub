import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { shadow } from "../../themes/theme";
import { useConfig } from "../../hooks";
import { user } from "../../hooks/types";
import { Feather } from "@expo/vector-icons";

interface IUserCard {
  user: user;
}

export function UserCard({ user }: IUserCard): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View
      style={[
        styles.container,
        shadow,
        { backgroundColor: theme.colors.foreground },
      ]}
    >
      {user.assets.image.uri ? (
        <Image
          testID="userimage"
          style={styles.image}
          source={{
            uri: user?.assets.image.uri,
          }}
        />
      ) : (
        <View style={styles.placeholderContainer} testID="placeholderimage">
          <Feather
            name="user"
            size={25}
            style={styles.placeholder}
            color={theme.colors.text}
          />
        </View>
      )}
      <View style={{ marginLeft: 10 }}>
        <Text style={[styles.name, { color: theme.colors.headerText }]}>
          {user?.names.international}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Image
            source={{
              uri: `https://www.speedrun.com/images/flags/${user?.location?.country.code}.png`,
            }}
            style={styles.flag}
          />
          <Text style={[styles.countryName, { color: theme.colors.text }]}>
            {user?.location?.country.names.international}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
  },
  placeholderContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
  },
  placeholder: {
    alignSelf: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  flag: {
    alignSelf: "center",
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  countryName: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: 12,
  },
  name: {
    fontFamily: "Poppins",
    fontSize: 16,
    flex: 1,
    textAlignVertical: "bottom",
  },
});
