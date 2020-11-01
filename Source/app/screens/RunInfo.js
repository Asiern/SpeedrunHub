import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Button from "../components/Buttons/SquareButton"

import { h2, h3 } from "../themes/Styles"
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
            console.log(data.data);
            
          })();
        }    
        return function cleanup() {
          mounted = false;
        };
      }, []);
      if(loading){
        return(<ActivityIndicator size="large" color={colors.blue}/>)
      }
      else{
    return(
      <ScrollView style={styles.container}>
          <View style={styles.video}>
            {loading?
              <ActivityIndicator size="large" color={colors.blue}/>:  
              <VideoPreview link={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"} weblink={data.videos.links[0].uri}/>      
            }
          </View>
          <View style={styles.title}>
          <Text style={h3}>GSR in 1h 13m 31s by {getPlayers(data)}</Text>
            <Text style={h3}>1st place</Text>
          </View>        
          {data.splits == null?(null):
          <Button backgroundColor={colors.green} color={colors.white} title={"Splits"} />
          }
      </ScrollView>);
    }
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
    title:{
      padding:20,
      justifyContent:"center",
      alignItems:"center",
    },
    infocard:{
      flex:1,
      margin:20,
      borderRadius:30,
      backgroundColor:colors.white,
      alignItems:"center",
      shadowColor: "gold",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.9,
      elevation: 5,
    },
    info:{
      paddingVertical:20,
    }
})
