import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { getUser, useConfig } from "../../hooks";
import { loadInBrowser } from "../../utils";
import { user } from "../../hooks/types";

export function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const navigation = useNavigation();
  const { config, setConfig } = useConfig();
  const { theme } = config;

  async function guestLogin() {
    setConfig({ ...config, user: null, logged: true, key: null });
    navigation.navigate("Main", { screen: "Home" });
  }

  async function login(username: string, key: string) {
    try {
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
          Welcome to SpeedrunHub!
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
          Please login to continue.
        </Text>
        <TextInput
          onChange={setUsername}
          value={username}
          placehorder="username"
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
            Username not found. Make sure the username you inputed is correct.
          </Text>
        ) : null}
        <TextInput
          onChange={setKey}
          value={key}
          placehorder="API-key"
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
          Get your API key.
        </Text>
        <View style={{ marginTop: 10 }}>
          <Button
            label="Login"
            onPress={() => login(username, key)}
            variant="primary"
            shadow
            icon={"log-in"}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            label="Login as guest"
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
