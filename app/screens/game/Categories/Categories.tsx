import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { category } from "../../../hooks/types";
import { StyleSheet } from "react-native";
import { Button } from "../../../components";

interface ICategories {
  categories: category[];
  setCategory: (value: string) => void;
  category: string;
}

function Categories({
  categories,
  category,
  setCategory,
}: ICategories): JSX.Element {
  return (
    <ScrollView
      style={styles.conatiner}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      bounces={false}
      scrollEventThrottle={16}
    >
      {categories.map(({ name, id }, i: number) => {
        return (
          <Button
            key={id}
            label={name}
            onPress={() => setCategory(id)}
            shadow
            variant={category === id ? "primary" : "default"}
            style={{
              marginLeft: i === 0 ? 30 : 5,
              marginVertical: 5,
              marginRight: i === categories.length - 1 ? 30 : 0,
              borderRadius: 10,
            }}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 10,
  },
});

export default memo(Categories);
