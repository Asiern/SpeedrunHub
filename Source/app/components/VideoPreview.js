import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoPreview = ({link}) => (
    <View style={styles.container}>
        <Video
            source={{ uri: link }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            style={{ width: 300, height: 300 }}
          />
    </View>
);
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        padding:20,
    }
})
export default VideoPreview;
