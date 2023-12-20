import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Filter } from "./Filter";
import crashlytics from "@react-native-firebase/crashlytics";

interface IFilters {
  filters: string[]; // An array of all possible filters
  initial: string[]; // An array of initially enabled filters
  onChange: (filters: string[]) => void; // A function to be called when filters are changed
}

export function Filters({ filters, initial, onChange }: IFilters): JSX.Element {
  const [enabled, setEnabled] = useState<string[]>(initial);
  const [disabled, setDisabled] = useState<string[]>(
    filters.filter((f) => !initial.includes(f))
  );

  const onRemove = useCallback(
    (filter: string) => {
      try {
        crashlytics().log("Filter removed");
        const newFilters: string[] = enabled.filter((f) => f !== filter);
        setEnabled([...newFilters]);
        setDisabled([...disabled, filter]);
        onChange(newFilters); // Call the onChange function to notify of the filter change
      } catch (e) {
        console.error(e);
        crashlytics().recordError(e);
      }
    },
    [enabled, disabled]
  );

  const onAdd = useCallback(
    (filter: string) => {
      try {
        crashlytics().log("Filter added");
        const newEnabled: string[] = [...enabled, filter];
        setEnabled(newEnabled);
        const newDisabled: string[] = disabled.filter((f) => f !== filter);
        setDisabled([...newDisabled]);
        onChange(newEnabled); // Call the onChange function to notify of the filter change
      } catch (e) {
        console.error(e);
        crashlytics().recordError(e);
      }
    },
    [enabled, disabled]
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={16}
      >
        <View
          style={{
            marginHorizontal: 30,
            flexDirection: "row",
            marginVertical: 5,
          }}
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
        </View>
      </ScrollView>
    </View>
  );
}
