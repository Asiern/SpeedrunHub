import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { shadow } from "../themes/theme";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { user } from "../hooks/types";
import { useConfig } from "../hooks";

// TODO Center username when location === null
// TODO Disable self profile link when user is "Guest"
// TODO Set onPress action (when user is "Guest") to log out

interface IUserCard {
  user: user;
}

const HEIGHT = 60;
export function UserCard({ user }: IUserCard): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      testID="usercard-touchable"
      style={[
        {
          backgroundColor: theme.colors.foreground,
          paddingLeft: 20,
          borderRadius: 10,
          flex: 1,
        },
        shadow,
      ]}
      onPress={() => {
        navigation.navigate("Profile", { user: user });
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 16,
              color: theme.colors.headerText,
              flex: 1,
              textAlignVertical: "bottom",
            }}
          >
            {user.names.international}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: `https://www.speedrun.com/images/flags/${user.location?.country.code}.png`,
              }}
              style={{
                alignSelf: "center",
                width: 10,
                height: 10,
                borderRadius: 15,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "Poppins",
                fontSize: 12,
                color: theme.colors.text,
              }}
            >
              {user.location?.country.names.international}
            </Text>
          </View>
        </View>
        {user.assets.image === null ? (
          <View
            style={{
              width: HEIGHT,
              height: HEIGHT,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Feather
                name="user"
                size={25}
                style={{ alignSelf: "center" }}
                color={theme.colors.headerText}
              />
            </View>
          </View>
        ) : (
          <Image
            style={{
              width: HEIGHT,
              height: HEIGHT,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              marginLeft: 10,
            }}
            source={{
              uri: user.assets.image?.uri ?? undefined,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
