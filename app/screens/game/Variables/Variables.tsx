import React, { memo } from "react";
import { View } from "react-native";
import { variable } from "../../../hooks/types";
import Values from "./Values";
import { selectedVariables } from "../GameInfo";

interface IVariables {
  variables: variable[];
  selectedVariables: selectedVariables;
  setSelectedVariables: (value: selectedVariables) => void;
}

function Variables({
  variables,
  selectedVariables,
  setSelectedVariables,
}: IVariables): JSX.Element {
  return (
    <View>
      {variables.map(({ id, values }) => {
        return (
          <Values
            {...{
              values,
              selectedVariables,
              setSelectedVariables,
              variable: id,
            }}
            key={id}
          />
        );
      })}
    </View>
  );
}

export default memo(Variables);
