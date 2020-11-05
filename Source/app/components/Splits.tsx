import * as React from 'react';
import { View, StyleSheet, Text } from "react-native";

interface SplitsProps {
    name: String,
    duration: String,
    finished: String,
}

const Splits: React.FC<SplitsProps> = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.nameContainer}>
            <Text>{props.name}</Text>
        </View>
        <View style={styles.durationContainer}>
            <Text>{props.duration}</Text>
        </View>
        <View style={styles.finishedContainer}>
            <Text>{props.finished}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10,
    },
    nameContainer:{
        flex:5,
        marginHorizontal:10,
        marginVertical:10,
        alignItems:"center"
    },
    durationContainer:{
        flex:3,
        marginHorizontal:5,
        marginVertical:10,
        alignItems:"center"
    },
    finishedContainer:{
        flex:3,
        marginHorizontal:5,
        marginVertical:10,
        alignItems:"center"
    },
})
export default Splits;