import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../config/colors";
import { Button } from "native-base";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textinput: "",
    };
  }
  saveSetting = (input) => {
    this.textinput = input;
  };
  render() {
    const textinput = this.state.textinput;

    return (
      <View style={styles.container}>
        <Button onPress={this.saveSetting("ASIER")} />
        <Text>User</Text>
        <View style={styles.textinputcontainer}>
          <TextInput
            placeholder="TEXT"
            onSubmitEditing={this.saveSetting(textinput)}
            value={textinput}
            style={styles.textinput}
          />
          <TouchableOpacity
            style={styles.closeButtonParent}
            //onPress={() => ()}
          >
            <Image
              style={styles.closeButton}
              source={{
                uri: "https://image.flaticon.com/icons/png/512/69/69324.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  textinputcontainer: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textinput: {
    height: 50,
    width: "90%",
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});

export default Settings;
