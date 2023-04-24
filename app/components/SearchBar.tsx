import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { shadow } from "../themes/theme";
import { context } from "../config/config";

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
  const [query, setQuery] = useState<string>(initialValue);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 30,
        marginVertical: 10,
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
          },
          shadow,
        ]}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            height: 50,
            width: 50,
            alignItems: "center",
            borderRadius: 12,
            marginLeft: 10,
          },
          shadow,
        ]}
        onPress={() => onSearch(query)}
      >
        <Feather name="search" size={25} color={theme.colors.foreground} />
      </TouchableOpacity>
    </View>
  );
}
