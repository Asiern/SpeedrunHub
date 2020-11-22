import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
import { Text, ToastAndroid, View } from "react-native";
import Button from "../../components/Buttons/Button";
import { h2 } from "../../themes/theme";

export default function DevSettings() {
  const Toast = (text: string) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  return (
    <View style={{ alignItems: "center", flex: 1, padding: 20 }}>
      <Text style={h2}>Async Storage Settings</Text>
      <Button
        variant={"primary"}
        label={"Delete Onboarding"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@Onboarding");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
      <Button
        variant={"primary"}
        label={"Delete MyGames"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@MyGames");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
    </View>
  );
}
