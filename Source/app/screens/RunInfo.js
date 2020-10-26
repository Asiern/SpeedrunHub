import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { h1, h2 } from "../themes/Styles"
import VideoPreview from "../components/VideoPreview"
import colors from "../config/colors"

function getId(weblink){
    const first = weblink.lastIndexOf("/")+1;
    const last = weblink.length;
    return (weblink.slice(first,last));
}
function getPlayers(data){
  var outString = "";
  for (let player of data.players.data){
    if(player.names.international != "null"){
      console.log(player.names.international)
      outString += player.names.international;
    }
    else{
      outString += player.names.japanese;
    }
  }
  return outString;
}
export default function RunInfo (props) {
    const { weblink } = props.route.params;
    const [data,setData]= useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
          (async () => {
            //Request
            const url = "https://www.speedrun.com/api/v1/runs/"+getId(weblink)+"?embed=players";
            const response = await fetch(url);
            const data = await response.json();
            setData(data.data);
            setLoading(false);
            console.log(data.data)
            
          })();
        }    
        return function cleanup() {
          mounted = false;
        };
      }, []);
    return(
    <View style={styles.container}>
        <View style={styles.video}>
          {loading?
          <ActivityIndicator size="large" color={colors.blue}/>:  
          <VideoPreview link={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}/>      
          }
        </View>
        <View style={styles.info}>
        {loading?<ActivityIndicator size="medium" color={colors.blue}/>:<Text style={h2}>{getPlayers(data)}</Text>}
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.light,
    },
    video:{
      flex:1,
      backgroundColor: colors.green,
    },
    info:{
      flex:1,
      margin:20,
      borderRadius:30,
      backgroundColor:colors.white,
      alignItems:"center",
      shadowColor: "gold",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.9,
      elevation: 5,
    }
})
