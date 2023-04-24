import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { View, StyleSheet, Linking, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../themes/theme";
import { GLYPHS } from "@expo/vector-icons/createIconSet";
import { context } from "../../config/config";

export interface LinksProps {
  videolink: string;
  weblink: string;
}

export default function Links({ videolink, weblink }: LinksProps) {
  const { config } = React.useContext(context)!;
  const { theme } = config;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: weblink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Loads videolink on browser
  function openOnBrowser(link: string) {
    Linking.openURL(link);
  }

  //Set icon depending on the video platform
  var browsericon: GLYPHS = "globe";
  if (videolink.includes("yout")) {
    browsericon = "youtube";
  } else if (videolink.includes("twit")) {
    browsericon = "twitch";
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <TouchableOpacity onPress={() => openOnBrowser(videolink)}>
        <Feather name={browsericon} size={30} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare}>
        <Feather name={"share-2"} size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
});
