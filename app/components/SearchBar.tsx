import React, { memo, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { shadow } from "../themes/theme";
import { SquareButton } from "./SquareButton";
import { useConfig } from "../hooks";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();
  // Render a view containing a text input and a search button
  return (
    <View
      style={[
        {
          flexDirection: "row",
          height: 50,
          flex: 1,
          backgroundColor: theme.colors.foreground,
          borderRadius: 12,
        },
        shadow,
      ]}
    >
      <TextInput
        testID="input"
        placeholder={t("search-games-users", { ns: "validation" })}
        onChangeText={(v) => {
          onChangeText(v);
          setValue(v);
        }}
        onSubmitEditing={onSearch}
        value={value}
        style={[
          {
            fontFamily: "Poppins",
            textAlignVertical: "center",
            flex: 1,
            marginLeft: 10,
          },
        ]}
      />
      <SquareButton
        icon="search"
        onPress={onSearch}
        variant="default"
        shadow={false}
      />
    </View>
  );
}

// Memoize the component to optimize performance
export default memo(SearchBar);
