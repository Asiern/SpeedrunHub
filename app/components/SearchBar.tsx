import React, { memo, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { shadow } from "../themes/theme";
import { SquareButton } from "./SquareButton";
import { useConfig } from "../hooks";

export interface ISearchBar {
  onSearch: () => void;
  initialValue?: string;
  onChangeText: (value: string) => void;
}

function SearchBar({
  onSearch,
  initialValue = undefined,
  onChangeText,
}: ISearchBar): JSX.Element {
  const [value, setValue] = useState<string>(initialValue ?? "");

  // Retrieve the theme from the app context
  const { config } = useConfig();
  const { theme } = config;

  // Render a view containing a text input and a search button
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <TextInput
        testID="input"
        placeholder={"Search for games/users..."}
        onChangeText={(v) => {
          onChangeText(v);
          setValue(v);
        }}
        onSubmitEditing={onSearch}
        value={value}
        style={[
          {
            height: 50,
            flex: 1,
            backgroundColor: theme.colors.foreground,
            borderRadius: 12,
            padding: 10,
            fontFamily: "Poppins",
            textAlignVertical: "center",
            marginRight: 5,
          },
          shadow,
        ]}
      />
      <SquareButton icon="search" onPress={onSearch} variant="primary" />
    </View>
  );
}

// Memoize the component to optimize performance
export default memo(SearchBar);
