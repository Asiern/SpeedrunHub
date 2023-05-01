import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Filter } from "./Filter";

interface IFilters {
  filters: string[]; // An array of all possible filters
  initial: string[]; // An array of initially enabled filters
  onChange: () => void; // A function to be called when filters are changed
}

export function Filters({ filters, initial, onChange }: IFilters): JSX.Element {
  const [enabled, setEnabled] = useState<string[]>(initial);
  const [disabled, setDisabled] = useState<string[]>(
    filters.filter((f) => !initial.includes(f))
  );

  // Define a function to remove a filter from the enabled list
  function onRemove(filter: string) {
    const newFilters: string[] = enabled.filter((f) => f !== filter);
    setEnabled([...newFilters]);
    setDisabled([...disabled, filter]);
    onChange(); // Call the onChange function to notify of the filter change
  }

  // Define a function to add a filter to the enabled list
  function onAdd(filter: string) {
    setEnabled([...enabled, filter]);
    const newDisabled: string[] = disabled.filter((f) => f !== filter);
    setDisabled([...newDisabled]);
    onChange(); // Call the onChange function to notify of the filter change
  }

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={16}
        style={{ marginHorizontal: 30 }}
      >
        {/* Render the enabled filters */}
        {enabled.map((filter: string, index: number) => {
          return (
            <Filter
              label={filter}
              key={index + filter} // Use a unique key for each filter
              onPress={() => onRemove(filter)} // Call onRemove when the filter is pressed
              variant="remove" // Use the remove variant of the Filter component
            />
          );
        })}
        {/* Render the disabled filters */}
        {disabled.map((filter: string, index: number) => {
          return (
            <Filter
              label={filter}
              onPress={() => onAdd(filter)} // Call onAdd when the filter is pressed
              key={index + filter} // Use a unique key for each filter
              variant="add" // Use the add variant of the Filter component
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
