import React from "react";
import { TouchableOpacity, View } from "react-native";
import { shadow } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";
import { loadInBrowser } from "../../utils";
import { useConfig } from "../../hooks";

interface ISocialButton {
  uri: string;
  icon: string;
}

export function SocialButton({ icon, uri }: ISocialButton): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      onPress={() => loadInBrowser(uri)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Feather
        name={icon}
        size={20}
        color={theme.colors.primary}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );
}

export function Social(): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View
      style={[
        {
          height: 50,
          backgroundColor: theme.colors.foreground,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        },
        shadow,
      ]}
    ></View>
  );
}
