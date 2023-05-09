import React, { memo, useContext, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { shadow } from "../themes/theme";
import { context } from "../config/config";
import { SquareButton } from "./SquareButton";

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
  const { config } = useContext(context)!;
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
        placeholder={"Search for games/users..."}
        onChangeText={(v) => {
          onChangeText(v);
          setValue(v);
        }}
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
