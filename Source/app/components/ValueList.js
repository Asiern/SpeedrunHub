import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../config/colors";
import Button from "../components/Button";

//TODO interface

const ValueList = (props) => {
  function renderItem() {
    return <Button color={colors.primary} text={props.text}></Button>;
  }
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={renderItem()}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default ValueList;
