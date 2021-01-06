import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { h2w } from "../../themes/theme";
import Carousel from "./ProfileCarousel";
import { context } from "../../config/config";
import TopBar from "../TopBar";

export interface ProfileHeaderProps {
  username: string;
  country?: string;
  signup?: string;
  onPress: () => void;
}

const ProfileHeader = ({
  username,
  country,
  signup,
  onPress,
}: ProfileHeaderProps) => {
  const { theme } = useContext(context);
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <TopBar variant={"transparent"} label={"Profile"} />
      <View style={styles.imagecontainer}>
        <Carousel username={username} signup={signup} country={country} />
      </View>
      <View style={styles.userinfo}>
        <Text style={[h2w, { fontWeight: "bold" }]}>{username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  profile: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
export default ProfileHeader;
