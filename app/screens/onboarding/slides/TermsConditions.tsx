import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../../hooks";
import Checkbox from "expo-checkbox";
import { loadInBrowser } from "../../../utils";
import { Button } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import crashlytics from "@react-native-firebase/crashlytics";

interface ITermsConditions {
  width: number;
}

export default function TermsConditions({
  width,
}: ITermsConditions): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();

  const [hasAccepted, setHasAccepted] = React.useState<boolean>(false);

  function finishOnboarding() {
    try {
      crashlytics().log("User accepted terms and conditions");
      setConfig({
        ...config,
        onboarding: true,
        accepted: true,
      });

      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
      crashlytics().recordError(e);
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.subHeader, { color: theme.colors.headerText }]}>
        Terms and Conditions
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.headerText, marginTop: 5 }]}
      >
        Before you can proceed, please review and accept our Terms and
        Conditions and Privacy Policy. By accepting, you acknowledge that you
        have read and understood our policies and agree to abide by them. Your
        privacy and data security are important to us, and we appreciate your
        trust in our app.
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.primary, marginTop: 5 }]}
        onPress={() =>
          loadInBrowser(
            "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Terms%20%26%20Conditions.md"
          )
        }
      >
        Terms and Conditions
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.primary, marginTop: 5 }]}
        onPress={() =>
          loadInBrowser(
            "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Privacy%20Policy.md"
          )
        }
      >
        Privacy Policy
      </Text>
      <View style={styles.checkBoxView}>
        <Checkbox
          accessible
          accessibilityHint="Toggles terms and conditions acceptance"
          accessibilityLabel="Terms and conditions toggle"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: hasAccepted }}
          value={hasAccepted}
          onValueChange={() => setHasAccepted(!hasAccepted)}
          color={
            config.google.crashlyticsEnabled ? theme.colors.primary : undefined
          }
        />
        <Text
          style={[
            styles.text,
            { color: theme.colors.text, marginLeft: 5, textAlign: "justify" },
          ]}
        >
          I accept the Terms and Conditions and Privacy Policy.
        </Text>
      </View>
      <Button
        buttonProps={{
          accessible: true,
          accessibilityLabel: "Start browsing button",
          accessibilityHint: "Navigates to the login screen",
          accessibilityRole: "button",
          accessibilityState: { disabled: !hasAccepted },
        }}
        label={hasAccepted ? "Start browsing!" : "Please accept to continue."}
        onPress={finishOnboarding}
        variant={hasAccepted ? "primary" : "default"}
        style={{ flex: 0, marginTop: 10 }}
        disabled={!hasAccepted}
        centerContent
        shadow
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins",
    textAlign: "justify",
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
