import React, { memo } from "react";
import { ActivityIndicator as ActivityIndicatorBase } from "react-native";
import { useConfig } from "../hooks";

function ActivityIndicator(): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <ActivityIndicatorBase
      color={theme.colors.primary}
      size={30}
      testID="activity-indicator"
    />
  );
}

export default memo(ActivityIndicator);
