import React, { memo } from "react";
import { TextInput as Input } from "react-native-gesture-handler";
import { shadow } from "../themes/theme";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useConfig } from "../hooks";

interface ITextInput {
  icon?: string;
  value?: string;
  onChange?: (value: string) => void;
  placehorder?: string;
  secureTextEntry?: boolean;
}

function TextInput({
  icon = undefined,
  onChange = () => null,
  value = undefined,
  placehorder = undefined,
  secureTextEntry = false,
}: ITextInput): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.foreground,
        },
        shadow,
      ]}
    >
      {icon && (
        <Feather
          name={icon}
          style={styles.icon}
          color={
            value || value !== "" ? theme.colors.headerText : theme.colors.text
          }
          size={15}
        />
      )}
      <Input
        testID="input"
        placeholder={placehorder}
        value={value}
        verticalAlign="middle"
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 15,
    fontFamily: "Poppins",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins",
  },
  icon: {
    marginRight: 10,
  },
});

export default memo(TextInput);
