import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { shadow } from "../../themes/theme";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { context } from "../../config/config";
import { getUser } from "../../hooks";
import { loadInBrowser } from "../../utils";
import { user } from "../../hooks/types";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const navigation = useNavigation();
  const { config, setConfig } = useContext(context)!;
  const { theme } = config;

  async function login(username: string, key: string) {
    try {
      if (username === "") {
        setUsernameError(true);
        return;
      }
      const user: user = await getUser(username);
      setConfig({ ...config, user, logged: true, key });
      navigation.navigate("Main", { screen: "Home" });
      console.log(user);
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
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          verticalAlign="middle"
          style={[
            {
              height: 50,
              backgroundColor: theme.colors.foreground,
              borderRadius: 15,
              padding: 10,
              fontFamily: "Poppins",
              textAlignVertical: "center",
              marginVertical: 10,
            },
            shadow,
          ]}
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
          placeholder="API-key"
          value={key}
          verticalAlign="middle"
          onChangeText={setKey}
          style={[
            {
              height: 50,
              backgroundColor: theme.colors.foreground,
              borderRadius: 15,
              padding: 10,
              fontFamily: "Poppins",
              marginVertical: 10,
              textAlignVertical: "center",
            },
            shadow,
          ]}
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
        <Button
          label="Login"
          onPress={() => login(username, key)}
          variant="primary"
          shadow
          icon={"log-in"}
        />
        <Button
          label="Login as guest"
          onPress={() => login("Guest", "")}
          variant="default"
          icon={"user-x"}
        />
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
