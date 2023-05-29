import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import { category, game } from "../../../hooks/types";
import { getCategories } from "../../../hooks";
import { ActivityIndicator } from "../../../components";

interface ICategoriesContainer {
  game: game;
  category: string;
  setCategory: (value: string) => void;
}

function CategoriesContainer({
  game,
  category,
  setCategory,
}: ICategoriesContainer): JSX.Element {
  const [categories, setCategories] = useState<category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    async function prepare() {
      const _categories = await getCategories(game.id);
      setCategories(_categories.data);
      setCategory(_categories.data[0].id);
      setLoading(false);
    }
    prepare();
  }, []);

  if (loading) return <ActivityIndicator />;

  if (categories.length === 0) return <></>;
  return <Categories {...{ categories, setCategory, category }} />;
}

export default CategoriesContainer;
