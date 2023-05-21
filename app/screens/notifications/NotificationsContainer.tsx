import React, { useEffect, useState } from "react";
import Notifications from "./Notifications";
import { notificationResponse } from "../../hooks/types";
import { getNotifications, useConfig } from "../../hooks";
import { ActivityIndicator } from "../../components";
import { View } from "react-native";

function NotificationsContainer(): JSX.Element {
  const { config } = useConfig();
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] =
    useState<notificationResponse | null>();

  async function prepare() {
    setLoading(true);
    const response = await getNotifications(config);
    setNotifications(response);
    setLoading(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );

  return <Notifications notifications={notifications} />;
}

export default NotificationsContainer;
