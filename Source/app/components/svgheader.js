import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import colors from "../config/colors";

export default function svgheader({ customStyles, height, width }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: colors.primary, height: height }}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 630"
          style={{ top: height, width: width }}
        >
          <Path
            fill={colors.primary}
            d="M0,64L30,85.3C60,107,120,149,180,154.7C240,160,300,128,360,138.7C420,149,480,203,540,224C600,245,660,235,720,202.7C780,171,840,117,900,101.3C960,85,1020,107,1080,144C1140,181,1200,235,1260,218.7C1320,203,1380,117,1410,74.7L1440,32L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}
