import React, { memo } from "react";

import { TouchableOpacity } from "react-native";
import { useConfig } from "../../hooks";
import { loadInBrowser } from "../../utils";
import { Feather } from "@expo/vector-icons";

interface ISocialButton {
  uri: string;
  icon: string;
}

function SocialButton({ icon, uri }: ISocialButton): JSX.Element {
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

export default memo(SocialButton);
