import React from "react";
import { View, StyleSheet } from "react-native";
import { shadow } from "../../themes/theme";
import { useConfig } from "../../hooks";
import { user } from "../../hooks/types";
import SocialButton from "./SocialButton";

interface ISocial {
  user: user;
}

export function Social({ user }: ISocial): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.foreground,
        },
        shadow,
        styles.container,
      ]}
    >
      {user.twitch ? (
        <SocialButton icon="twitch" uri={user.twitch.uri} />
      ) : null}
      {user.youtube ? (
        <SocialButton icon="youtube" uri={user.youtube.uri} />
      ) : null}
      {user.twitter ? (
        <SocialButton icon="twitter" uri={user.twitter.uri} />
      ) : null}
      {user.hitbox ? <SocialButton icon="globe" uri={user.hitbox.uri} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
