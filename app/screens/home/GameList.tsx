import React, { memo } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { game } from "../../types";
import { useConfig } from "../../hooks";
import { GameCard, ScrollIndicator } from "../../components";
import { shadow } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const CARD_GAP = 6;
const N_CARDS_SLIDE = 3;
const CARD_WIDTH: number = (width - 2 * 30 - 2 * CARD_GAP) / N_CARDS_SLIDE;
const CARD_HEIGHT: number = (CARD_WIDTH * 4) / 3;
const PREVIEW_CARD_COUNT = 8;
const SLIDE_WIDTH: number = width - 2 * 30;

function GameList(): JSX.Element {
  const { config } = useConfig();
  const { games, theme } = config;
  // const navigation = useNavigation();
  const gamesToRender: number = Math.min(games.length, PREVIEW_CARD_COUNT);
  const N_SLIDES: number = Math.round(gamesToRender / N_CARDS_SLIDE);

  const scrollX = useSharedValue<number>(0);

  const currentIndex = useDerivedValue(() => {
    return Math.round(scrollX.value / SLIDE_WIDTH);
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll({ contentOffset }) {
      scrollX.value = contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.colors.primary }]}>
        My Games
      </Text>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={SLIDE_WIDTH + CARD_GAP}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {games
          .slice(0, gamesToRender)
          .map(({ abbreviation, id, uri }: game, i: number) => {
            return (
              <GameCard
                style={{
                  marginRight: i === gamesToRender - 1 ? 0 : CARD_GAP,
                }}
                {...{
                  abbreviation,
                  id,
                  image: uri,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                }}
                key={id}
              />
            );
          })}
        {gamesToRender < games.length ? (
          <TouchableOpacity
            style={[
              styles.moreCard,
              shadow,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={
              () => null
              // TODO navigation.navigate("GameList")
            }
            testID="more-card-touchable"
          >
            <Feather name="list" color={theme.colors.foreground} size={25} />
            <Text style={[styles.text, { color: theme.colors.foreground }]}>
              Show All
            </Text>
          </TouchableOpacity>
        ) : null}
      </Animated.ScrollView>
      <ScrollIndicator
        gap={CARD_GAP / 2}
        index={currentIndex}
        slides={N_SLIDES}
        width={SLIDE_WIDTH}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,
  },
  moreCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginLeft: CARD_GAP,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins",
  },
});

export default memo(GameList);
