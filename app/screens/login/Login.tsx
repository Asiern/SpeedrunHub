import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { getUser, useConfig } from "../../hooks";
import { loadInBrowser } from "../../utils";
import { user } from "../../hooks/types";
import crashlytics from "@react-native-firebase/crashlytics";
import { useTranslation } from "react-i18next";

export function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const navigation = useNavigation();
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const { t } = useTranslation();

  async function guestLogin() {
    crashlytics().log("Guest login");
    setConfig({ ...config, user: null, logged: true, key: null });
    navigation.navigate("Main", { screen: "Home" });
  }

  async function login(username: string, key: string) {
    try {
      crashlytics().log("Login");
      if (username === "") {
        setUsernameError(true);
        return;
      }
      const user: user = await getUser(username);
      setConfig({
        ...config,
        user,
        logged: true,
        key: key === "" ? null : key,
      });
      navigation.navigate("Main", { screen: "Home" });
    } catch (e) {
      crashlytics().recordError(e);
      setUsernameError(true);
      console.warn(e);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.colors.background }}
    >
      <View style={[styles.container]}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            textAlign: "center",
            marginTop: 30,
            color: theme.colors.headerText,
          }}
        >
          {t("welcome-speedrunhub", { ns: "common" })}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 30,
            color: theme.colors.headerText,
          }}
        >
          {t("login-to-continue", { ns: "common" })}
        </Text>
        <TextInput
          onChange={setUsername}
          value={username}
          placehorder={t("username", { ns: "glossary" })}
          icon="user"
        />
        {usernameError ? (
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 12,
              alignSelf: "center",
              textAlign: "justify",
              color: theme.colors.error,
            }}
          >
            {t("username-not-found", { ns: "validation" })}
          </Text>
        ) : null}
        <TextInput
          onChange={setKey}
          value={key}
          placehorder={`${t("api-key", { ns: "common" })} (${t("optional", {
            ns: "glossary",
          })})`}
          icon="key"
          secureTextEntry
        />
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 10,
            color: theme.colors.primary,
          }}
          onPress={() => loadInBrowser("https://www.speedrun.com/api/auth")}
        >
          {t("get-api-key", { ns: "common" })}
        </Text>
        <View style={{ marginTop: 10 }}>
          <Button
            label={t("login", { ns: "common" })}
            onPress={() => login(username, key)}
            variant="primary"
            shadow
            icon={"log-in"}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            label={t("login-guest", { ns: "common" })}
            onPress={guestLogin}
            variant="default"
            icon={"user-x"}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});
