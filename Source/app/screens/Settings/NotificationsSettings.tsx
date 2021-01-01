import React, { useContext, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ToastAndroid } from "react-native";
import { h3, h4 } from "../../themes/theme";
import { config, context } from "../../config/config";
import AsyncStorage from "@react-native-community/async-storage";
import Slider from "@react-native-community/slider";
import Button from "../../components/Buttons/Button";
const { width } = Dimensions.get("window");

async function apply(
  config: config,
  value: number,
  setConfig: (config: config) => void
) {
  try {
    config.notifications.max = value;
    setConfig(config);
    await AsyncStorage.setItem("@Config", JSON.stringify(config));
    showToastWithGravity("Settings applied correctly");
  } catch (error) {
    showToastWithGravity(error);
  }
}
const showToastWithGravity = (text: string) => {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export function NotificationsSettings() {
  const { Config, setConfig, theme } = useContext(context);
  const [max, setMax] = useState<number>(Config.notifications.max);
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.section}>
        <Text style={[h4, { color: theme.colors.text }]}>
          Set the maximum number of {"\n"}notifications to load
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[h3, { color: theme.colors.text }]}>{max}</Text>
        <Slider
          style={{ width: width - 40, height: 40 }}
          minimumValue={20}
          maximumValue={200}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.text}
          value={max}
          onValueChange={(value) => setMax(Math.round(value))}
        />
      </View>
      <Button
        variant={"primary"}
        label={"Apply Changes"}
        onPress={() => apply(Config, max, setConfig)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-around", alignItems: "center" },
  section: {
    width,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
