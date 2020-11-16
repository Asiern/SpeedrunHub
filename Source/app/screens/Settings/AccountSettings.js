import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Clipboard,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { colors } from "../../themes/theme";
import Button from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";

const AccountSettings = (props) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [key, setKey] = useState("");
  const navigation = useNavigation();

  const showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  function copyKey() {
    Clipboard.setString(key);
    showToastWithGravity("API-Key copied to clipboard");
  }
  useEffect(() => {
    (async () => {
      const tempuser = await AsyncStorage.getItem("@user");
      const tempuserid = await AsyncStorage.getItem("@userid");
      const tempuserkey = await AsyncStorage.getItem("@API-Key");
      setUser(tempuser);
      setUserId(tempuserid);
      setKey(tempuserkey);
    })();
  }, []);

  async function signOut() {
    const createTwoButtonAlert = (msg) =>
      Alert.alert("Alert", msg, [{ text: "OK", onPress: () => null }], {
        cancelable: true,
      });
    //Remove user
    await AsyncStorage.setItem("@user", "");
    await AsyncStorage.setItem("@userid", "");
    //Set login to 1
    await AsyncStorage.setItem("@Loggedin", "false");
    //Restart app
    navigation.navigate("Login", { screen: "Login" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.imagecontainer}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" + user + "/image.png",
            }}
            style={styles.image}
          ></Image>
        </View>
        <View style></View>
      </View>
      <View style={styles.logout}>
        <View style={styles.textinputs}>
          <Text style={styles.text}>User Name</Text>
          <TextInput style={styles.textinput} value={user} editable={false} />
          <Text style={styles.text}>User ID</Text>
          <TextInput style={styles.textinput} value={userId} editable={false} />
          <Text style={styles.text}>User API Key</Text>
          <TextInput
            style={styles.textinput}
            value={key}
            editable={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"LOG OUT"}
            textcolor={colors.white}
            color={colors.primary}
            function={() => signOut()}
          />
          <Button
            title={"COPY API-KEY"}
            textcolor={colors.darkgrey}
            color={colors.white}
            function={() => copyKey()}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
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
export default AccountSettings;
