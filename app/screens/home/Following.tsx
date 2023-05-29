import React, { memo } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useConfig } from "../../hooks";
import { UserContainer } from "../../components";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { ScrollIndicator } from "../../components";
import { Feather } from "@expo/vector-icons";
import { shadow } from "../../themes/theme";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const PADDING = 30;
const GAP = 6;
const N_CARDS_SLIDE = 3;
const USER_WIDTH: number = (width - 2 * 30 - 2 * GAP) / N_CARDS_SLIDE;
const SLIDE_WIDTH: number = width - 2 * 30;
const PREVIEW_USER_COUNT = 8;

function Following(): JSX.Element {
  const { config } = useConfig();
  const { theme, following } = config;
  const USERS_TO_RENDER = Math.min(PREVIEW_USER_COUNT, following?.length);
  const N_SLIDES: number = Math.ceil(USERS_TO_RENDER / N_CARDS_SLIDE);
  const nFillerCards: number = N_SLIDES * N_CARDS_SLIDE - USERS_TO_RENDER;

  const navigation = useNavigation();

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
      <Text
        style={[styles.header, { color: theme.colors.primary }]}
        onPress={() => navigation.navigate("Following")}
      >
        Following
      </Text>
      <Animated.ScrollView
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={SLIDE_WIDTH + GAP}
      >
        {following
          ?.slice(0, USERS_TO_RENDER)
          .map((userid: string, i: number) => {
            return (
              <View
                key={userid}
                style={i !== following.length - 1 ? { marginRight: GAP } : null}
              >
                <UserContainer id={userid} width={USER_WIDTH} />
              </View>
            );
          })}
        {USERS_TO_RENDER < following.length ? (
          <TouchableOpacity
            style={[
              styles.moreCard,
              { backgroundColor: theme.colors.primary },
              shadow,
            ]}
            testID="more-users-touchable"
            onPress={() => navigation.navigate("Following")}
          >
            <Feather name="user" size={25} color={theme.colors.foreground} />
            <Text style={[styles.text, { color: theme.colors.foreground }]}>
              Show All
            </Text>
          </TouchableOpacity>
        ) : nFillerCards > 0 ? (
          <View
            style={{
              width:
                nFillerCards === 1
                  ? USER_WIDTH + GAP
                  : 2 * USER_WIDTH + 2 * GAP,
            }}
          />
        ) : null}
      </Animated.ScrollView>
      <ScrollIndicator
        width={SLIDE_WIDTH}
        slides={N_SLIDES}
        index={currentIndex}
        gap={GAP}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: PADDING },
  header: { fontFamily: "Poppins-Medium", fontSize: 24 },
  moreCard: {
    width: USER_WIDTH,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    fontFamily: "Poppins",
  },
});

export default memo(Following);
