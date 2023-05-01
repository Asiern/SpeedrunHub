import React, { memo, useContext } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { shadow } from "../themes/theme";
import { context } from "../config/config";
import { SquareButton } from "./SquareButton";

export interface ISearchBar {
  onSearch: () => void;
  initialValue?: string;
  onChangeText?: (value) => void;
}

function SearchBar({
  onSearch,
  initialValue = "",
  onChangeText = () => {},
}: ISearchBar): JSX.Element {
  // Retrieve the theme from the app context
  const { config } = useContext(context)!;
  const { theme } = config;

  // Render a view containing a text input and a search button
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        flex: 1,
      }}
    >
      <TextInput
        placeholder={"Search for games/users..."}
        onChangeText={onChangeText}
        value={initialValue ?? undefined}
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
