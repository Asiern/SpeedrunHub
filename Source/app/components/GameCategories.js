import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import colors from "../config/colors"

const componentName = ({categories, checked, onPress,id}) => {
    
    function handlePress(categoryid,id) {
        onPress(categoryid,id);
      }

    return(
        <FlatList
            keyExtractor={(item) => item.id}
            data={categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
            <View>
                {checked == item.id ? (
                <TouchableOpacity
                    style={styles.buttoncontainer}
                    onPress={() => handlePress(item.id,id)}
                >
                    <View style={styles.buttontext}>
                    <Text style={[styles.text,{color: colors.primary}]}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity
                    style={styles.buttoncontainer}
                    onPress={() => handlePress(item.id,id)}
                >
                    <View style={styles.buttontext}>
                    <Text style={styles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                )}
            </View>
            )}
        ></FlatList>
    )
};

const styles = StyleSheet.create({
    buttoncontainer: {
        backgroundColor: colors.white,
        height: 46,
        marginVertical: 20,
        marginHorizontal: 10,
        shadowColor: colors.darkgrey,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.9,
        elevation: 2,
        justifyContent: "center",
        borderRadius: 10,
      },
      buttontext: {
        paddingHorizontal: 10,
      },
      text: {
        color: colors.darkgrey,
        fontWeight: "bold",
        fontSize: 15,
      },
})

export default componentName;
