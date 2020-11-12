import * as React from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';

export interface RunHeaderProps {
    id:string,
    backgroundUri:string,
}

export default function RunHeader (props: RunHeaderProps) {
    return (
      <ImageBackground
        style={styles.container}
        source={{
          uri:props.backgroundUri,
        }}
      >
        <View >
            <Text>
              {props.id}
            </Text>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        resizeMode: "contain",
        height:200,
    }
})