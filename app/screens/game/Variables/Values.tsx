import React, { memo, useEffect, useState } from "react";
import { variable } from "../../../hooks/types";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useConfig } from "../../../hooks";
import { shadow } from "../../../themes/theme";
import { selectedVariables } from "../GameInfo";

interface IValues {
  variable: string; //Variable id
  values: variable["values"];
  selectedVariables: selectedVariables;
  setSelectedVariables: (value: selectedVariables) => void;
}

function Values({
  variable,
  values,
  selectedVariables,
  setSelectedVariables,
}: IValues): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  function switchVariableValue(variable: string, value: string): void {
    const _selected = selectedVariables;
    _selected[variable] = value;
    setSelectedVariables({ ..._selected });
  }
  console.log(selectedVariables);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={16}
      >
        {Object.keys(values.values).map((key, i: number) => {
          const { label } = values.values[key];
          const [selected, setSelected] = useState<boolean>(false);
          useEffect(() => {
            setSelected(selectedVariables[variable] === key);
          }, [selectedVariables]);
          return (
            <Text
              key={key}
              testID="value-text"
              onPress={() => switchVariableValue(variable, key)}
              style={[
                styles.text,
                {
                  marginLeft: i === 0 ? 30 : 0,
                  marginRight: 5,
                  backgroundColor: theme.colors.foreground,
                  color: selected ? theme.colors.primary : theme.colors.text,
                },
                shadow,
              ]}
            >
              {label}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Poppins",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    marginVertical: 2,
  },
});

export default memo(Values);
