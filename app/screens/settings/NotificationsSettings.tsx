import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import { config } from "../../types";
import Constants from "expo-constants";
import { SquareButton } from "../../components/SquareButton";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../../hooks";
const { width } = Dimensions.get("window");

async function apply(
  config: config,
  max: number,
  unread: boolean,
  setConfig: (config: config) => void
) {
  try {
    const notifications = config.notifications;
    setConfig({ ...config, notifications: { ...notifications, max, unread } });
    showToastWithGravity("Settings applied correctly");
  } catch (error) {
    showToastWithGravity(error);
  }
}

const showToastWithGravity = (text: string) => {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export function NotificationsSettings(): JSX.Element {
  // Retrieve the theme from the app context
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();
  const [max, setMax] = useState<number>(config.notifications.max);
  const [unread, setUnread] = useState<boolean>(config.notifications.unread);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[styles.section, { backgroundColor: theme.colors.foreground }]}
      >
        <View style={styles.row}>
          <Text style={[{ color: theme.colors.headerText }, styles.text]}>
            Only show unread notifications
          </Text>
          <Switch
            value={unread}
            onValueChange={() => setUnread(!unread)}
            thumbColor={theme.colors.primary}
            trackColor={theme.colors.headerText}
            ios_backgroundColor={theme.colors.background}
          />
        </View>
      </View>
      <View
        style={[styles.section, { backgroundColor: theme.colors.foreground }]}
      >
        <Text style={[{ color: theme.colors.headerText }, styles.text]}>
          Set the number of notifications to receive{"\n"}
        </Text>
        <Text style={[{ color: theme.colors.headerText }, styles.text]}>
          {max}
        </Text>
        <Slider
          style={{
            width: width - 40,
            height: 40,
          }}
          minimumValue={20}
          maximumValue={200}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.text}
          value={max}
          onValueChange={(value) => setMax(Math.round(value))}
        />
      </View>
      {config.key ? (
        <SquareButton
          icon="save"
          onPress={() => apply(config, max, unread, setConfig)}
        />
      ) : (
        <View
          style={{
            padding: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.text,
              {
                color: theme.colors.headerText,
                textAlign: "justify",
                marginBottom: 10,
              },
            ]}
          >
            It seems you did not provide your api key, the key is required to
            receive notifications.{"\n"}Please log back in using your key.
          </Text>
          <SquareButton
            icon="log-out"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  section: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
});
