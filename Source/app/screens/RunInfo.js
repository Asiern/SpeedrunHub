import React,{useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from "../config/colors"
function getId(weblink){
    const first = weblink.lastIndexOf("/")+1;
    const last = weblink.length;
    return (weblink.slice(first,last));
}
export default function RunInfo (props) {
    const { weblink } = props.route.params;
    useEffect(() => {
        let mounted = true;
        if (mounted) {
          (async () => {
            //Request
            const url = "https://www.speedrun.com/api/v1/runs/"+getId(weblink)+"?embed=players";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            
          })();
        }    
        return function cleanup() {
          mounted = false;
        };
      }, []);
    return(
    <View style={styles.container}>
        <Text>RunInfo</Text>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    }
})
