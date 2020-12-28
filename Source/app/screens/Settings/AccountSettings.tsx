import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  ScrollView,
  Clipboard,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { colors } from "../../themes/theme";
import Button from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { context } from "../../config/config";

export const AccountSettings = () => {
  const navigation = useNavigation();
  const { theme, Config, setConfig } = useContext(context);
  const { username, userid, key } = Config.user;
  const showToastWithGravity = (text: string) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  async function copyKey() {
    await Clipboard.setString(key);
    showToastWithGravity("API-Key copied to clipboard");
  }

  async function signOut() {
    //Remove user
    Config.user = {
      logged: false,
      username: null,
      userid: null,
      key: null,
    };
    setConfig(Config);
    await AsyncStorage.setItem("@Config", JSON.stringify(Config));
    navigation.navigate("Login", { screen: "Login" });
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.user}>
        <View style={styles.imagecontainer}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" +
                username +
                "/image.png",
            }}
            style={styles.image}
          ></Image>
        </View>
      </View>
      <View style={styles.logout}>
        <View>
          <Text style={[styles.text, { color: theme.colors.text }]}>
            User Name
          </Text>
          <TextInput
            style={[styles.textinput, { color: theme.colors.text }]}
            value={username}
            editable={false}
          />
          <Text style={[styles.text, { color: theme.colors.text }]}>
            User ID
          </Text>
          <TextInput
            style={[styles.textinput, { color: theme.colors.text }]}
            value={userid}
            editable={false}
          />
          <Text style={[styles.text, { color: theme.colors.text }]}>
            User API Key
          </Text>
          <TextInput
            style={[styles.textinput, { color: theme.colors.text }]}
            value={key}
            editable={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label={"LOG OUT"}
            variant={"primary"}
            onPress={() => signOut()}
          />
          <Button
            label={"COPY API-KEY"}
            variant={"default"}
            onPress={() => copyKey()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  user: {
    flex: 0.3,
    backgroundColor: colors.primary,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  image: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderRadius: 130,
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    justifyContent: "space-evenly",
    alignContent: "center",
    marginHorizontal: 20,
    flex: 0.7,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkgrey,
    marginLeft: 5,
  },
});
