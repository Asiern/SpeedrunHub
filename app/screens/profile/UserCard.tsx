import React from "react";
import { Image, Text, View } from "react-native";
import { shadow } from "../../themes/theme";
import { useConfig } from "../../hooks";
import { user } from "../../hooks/types";

interface IUserCard {
  user: user;
}

export function UserCard({ user }: IUserCard): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.foreground,
          height: 60,
          // marginRight: 10,
          borderRadius: 10,
          flex: 1,
          flexDirection: "row",
        },
        shadow,
      ]}
    >
      <Image
        style={{
          width: 60,
          height: 60,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        source={{
          uri: user?.assets.image.uri,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            color: theme.colors.headerText,
            flex: 1,
            textAlignVertical: "bottom",
          }}
        >
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
            style={{
              alignSelf: "center",
              width: 10,
              height: 10,
              borderRadius: 10,
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
            {user?.location?.country.names.international}
          </Text>
        </View>
      </View>
    </View>
  );
}
