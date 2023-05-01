import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { shadow } from "../themes/theme";
import { context } from "../config/config";
import { SquareButton } from "./SquareButton";

export interface ISearchBar {
  onSearch: (query: string) => void;
  initialValue?: string;
}

SearchBar.DefaultProps = {
  initialValue: "",
};

export default function SearchBar({
  initialValue,
  onSearch,
}: ISearchBar): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  const [query, setQuery] = useState<string>(initialValue ?? "");

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Search for games/users..."
        value={query}
        onChangeText={setQuery}
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
      <SquareButton
        icon="search"
        onPress={() => onSearch(query)}
        variant="primary"
      />
    </View>
  );
}
