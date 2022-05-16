import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Split from "./Split";
import { colors, h2 } from "../../themes/theme";

export interface SplitsProps {
  data: any[];
}

export default function Splits({ data }: SplitsProps) {
  return (
    <View>
      <Text style={[h2, { alignSelf: "center", paddingTop: 20 }]}>Splits</Text>
      <View style={styles.splitsContainer}>
        {data.map((split, index) => {
          return (
            <Split
              key={index}
              name={split.name}
              duration={split.duration}
              finished={split.finish_time}
            />
          );
        })}
        <Text style={{ alignSelf: "center" }}>Powered by: splits i/o</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitsContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 20,
    paddingVertical: 20,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
});
