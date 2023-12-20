import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../../hooks";
import Checkbox from "expo-checkbox";
import { loadInBrowser } from "../../../utils";
import { Button } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import crashlytics from "@react-native-firebase/crashlytics";
import { useTranslation } from "react-i18next";

interface ITermsConditions {
  width: number;
}

export default function TermsConditions({
  width,
}: ITermsConditions): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();
  const { t } = useTranslation();
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
        {t("screens.onboarding.terms.title")}
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.headerText, marginTop: 5 }]}
      >
        {t("screens.onboarding.terms.description")}
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.primary, marginTop: 5 }]}
        onPress={() =>
          loadInBrowser(
            "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Terms%20%26%20Conditions.md"
          )
        }
      >
        {t("terms-conditions", { ns: "glossary" })}
      </Text>
      <Text
        style={[styles.text, { color: theme.colors.primary, marginTop: 5 }]}
        onPress={() =>
          loadInBrowser(
            "https://github.com/Asiern/SpeedrunHub/blob/main/docs/Privacy%20Policy.md"
          )
        }
      >
        {t("privacy-policy", { ns: "glossary" })}
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
          onPress={() => setHasAccepted(!hasAccepted)}
          accessible
          accessibilityLabel="Terms and conditions toggle"
          style={[
            styles.text,
            { color: theme.colors.text, marginLeft: 5, textAlign: "justify" },
          ]}
        >
          {t("screens.onboarding.terms.toggle")}
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
        label={
          hasAccepted
            ? t("screens.onboarding.terms.continue-button")
            : t("screens.onboarding.terms.continue-button-disabled")
        }
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
