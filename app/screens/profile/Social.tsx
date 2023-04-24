import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { context } from "../../config/config";
import { shadow } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";
import { loadInBrowser } from "../../utils";

interface ISocialButton {
  uri: string;
  icon: string;
}

export function SocialButton({ icon, uri }: ISocialButton): JSX.Element {
  const { config } = useContext(context)!;
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
  const { config, setConfig } = useContext(context)!;
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
    >
      {config.user.social?.map(({ icon, uri }, i: number) => {
        return <SocialButton icon={icon} uri={uri} key={i} />;
      })}
    </View>
  );
}
