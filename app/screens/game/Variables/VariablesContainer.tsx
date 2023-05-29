import React, { useEffect, useState } from "react";
import Variables from "./Variables";
import getVariables from "../../../hooks/getVariables";
import { variable } from "../../../hooks/types";
import { selectedVariables } from "../GameInfo";

interface IVariablesContainer {
  category: string; // Category id
  selectedVariables: selectedVariables;
  setSelectedVariables: (value: selectedVariables) => void;
}

function VariablesContainer({
  category,
  selectedVariables,
  setSelectedVariables,
}: IVariablesContainer): JSX.Element {
  const [variables, setVariables] = useState<variable[]>([]);
  useEffect(() => {
    async function prepare() {
      if (category === "") return;
      const variablesResponse = await getVariables(category);
      const _variables = variablesResponse.data.filter(
        (variable) => variable["is-subcategory"]
      );
      _variables.map((variable) => {
        const key = variable.id;
        const def = variable.values.default;
        const _selected = selectedVariables;
        _selected[key] = def;
        setSelectedVariables({
          ..._selected,
        });
      });
      setVariables(_variables);
    }
    prepare();
  }, [category]);
  return (
    <Variables {...{ variables, selectedVariables, setSelectedVariables }} />
  );
}

export default VariablesContainer;
