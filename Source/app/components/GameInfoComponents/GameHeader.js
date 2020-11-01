import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
import colors from "../../config/colors"
import { h1w } from "../../themes/Styles"
const GameHeader = ({abbreviation,name}) => {
    return(
        <ImageBackground
        style={styles.profileBG}
        source={{
          uri:
            "https://www.speedrun.com/themes/" +
            abbreviation +
            "/cover-256.png",
        }}
        opacity={0.3}
      >
        <View style={styles.profile}>
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri:
                  "https://www.speedrun.com/themes/" +
                  abbreviation +
                  "/cover-256.png",
              }}
              style={styles.Image}
            ></Image>
          </View>
        </View>
        <View style={styles.userinfo}>
            <Text style={h1w}>
              {name}
            </Text>
        </View>
      </ImageBackground>
    )
};

const styles = StyleSheet.create({
    profileBG: {
      flex: 1,
      resizeMode: "cover",
      backgroundColor: colors.black,
    },
    imagecontainer: {
        flex: 1,
        paddingTop: 30,
        alignContent: "center",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    Image: {
        width: 110,
        height: 150,
        padding: 10,
        borderRadius: 10,
    },
    profile: {
        flex: 1,
    },
    userinfo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
})
export default GameHeader;
