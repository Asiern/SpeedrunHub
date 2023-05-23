import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { game, personalBest } from "../../hooks/types";
import {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useConfig } from "../../hooks";
import GameCard, { CARD_HEIGHT, CARD_WIDTH } from "./GameCard";
import { shadow } from "../../themes/theme";
import Animated from "react-native-reanimated";
import PB from "./PB";
import { ScrollIndicator } from "../../components";

const { width } = Dimensions.get("screen");

interface IPersonalBests {
  games: game[];
  pbs: personalBest[];
}

function PersonalBests({ games, pbs }: IPersonalBests): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  const [selectedPBs, setSelectedPBs] = useState<personalBest[]>([]);

  const scrollX = useSharedValue<number>(0);
  const currentIndex = useSharedValue<number>(0);

  function loadPBs() {
    setSelectedPBs(
      pbs.filter((pb) => pb.game.data.id === games[currentIndex.value].id)
    );
  }

  useEffect(() => {
    loadPBs();
  }, []);

  const onScrollHeader = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    const newIndex = Math.round(event.contentOffset.x / CARD_WIDTH);

    // Scrolling changed index
    if (currentIndex.value !== newIndex) {
      // Set new index
      currentIndex.value = newIndex;
      // Reload PBs
      runOnJS(loadPBs)();
    }
  });
  return (
    <View style={{ marginTop: 15 }}>
      <View style={[styles.gameScrollviewContainer, shadow]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={CARD_WIDTH}
          showsHorizontalScrollIndicator={false}
          decelerationRate={"fast"}
          scrollEventThrottle={16}
          onScroll={onScrollHeader}
          bounces={false}
        >
          {games.map((game: game) => {
            return <GameCard game={game} key={game.id} />;
          })}
        </Animated.ScrollView>
      </View>
      <View
        style={[
          styles.scrollIndicatorContainer,
          shadow,
          {
            backgroundColor: theme.colors.foreground,
          },
        ]}
      >
        <ScrollIndicator
          index={currentIndex}
          slides={games.length}
          width={width - 60 - 10}
        />
      </View>
      <View style={styles.pbContainer}>
        {selectedPBs.map((pb) => {
          return <PB pb={pb} key={pb.run.id} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  header: { flexDirection: "row" },
  gameScrollviewContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginBottom: 5,
    marginHorizontal: 30,
  },
  runScrollView: {
    width,
  },
  pbContainer: {
    width,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  scrollIndicatorContainer: {
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default memo(PersonalBests);
