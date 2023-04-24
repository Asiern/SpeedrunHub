import React, { useContext } from "react";
import { Text, View } from "react-native";
import { context } from "../../config/config";
import { ScrollView } from "react-native-gesture-handler";

export interface IFilter {
  label: string;
  selected: boolean;
  index: number;
}

function Filter({ label, selected, index }: IFilter): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.primary,
          height: 40,
          margin: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
        },
        index === 0 ? { marginLeft: 30 } : null,
      ]}
    >
      <Text
        style={{
          fontFamily: "Poppins",
          fontSize: 15,
          color: theme.colors.foreground,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const options: IFilter[] = [
  { label: "Users", selected: false, index: 0 },
  { label: "Games", selected: true, index: 1 },
];

interface IFilters {}

export function Filters({}: IFilters): JSX.Element {
  return (
    <View>
      <ScrollView horizontal decelerationRate={"fast"}>
        {options.map(({ label, selected, index }, key: number) => {
          return <Filter {...{ label, selected, index, key }} />;
        })}
      </ScrollView>
    </View>
  );
}
