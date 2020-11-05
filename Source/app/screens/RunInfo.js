import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Linking } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import Button from "../components/Buttons/SquareButton";
import Split from "../components/Splits";

import { h3, h4 } from "../themes/Styles";
import VideoPreview from "../components/VideoPreview";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";

function loadInBrowser(link) {
  Linking.openURL(link).catch((err) =>
    console.error("Couldn't load page", err)
  );
}
function getId(weblink) {
  const first = weblink.lastIndexOf("/") + 1;
  const last = weblink.length;
  return weblink.slice(first, last);
}
function getPlayers(data) {
  var outString = "";
  for (let player of data.players.data) {
    if (player.names.international != "null") {
      outString += player.names.international;
    } else {
      outString += player.names.japanese;
    }
  }
  return outString;
}
export default function RunInfo(props) {
  const { weblink } = props.route.params;
  const [data, setData] = useState([]);
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //Request
        const url =
          "https://www.speedrun.com/api/v1/runs/" +
          getId(weblink) +
          "?embed=players";
        const response = await fetch(url);
        const data = await response.json();
        setData(data.data);
        console.log(data.data);
        //Splits
        if (data.data.splits != null) {
          const splitUrl = data.data.splits.uri;
          const splitresponse = await fetch(splitUrl);
          const splitdata = await splitresponse.json();
          setSplits(splitdata.run);
        }
        setLoading(false);
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", flex: 1 }}
        size="large"
        color={colors.primary}
      />
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text style={h3}>GSR in 1h 13m 31s by {getPlayers(data)}</Text>
          <Text style={h3}>1st place</Text>
        </View>
        <View style={styles.title}>
          <Text style={h4}>Verified by ffleret</Text>
        </View>
        <View style={styles.video}>
          <Button
            title={"Open video"}
            color={colors.white}
            backgroundColor={colors.red}
            icon={"youtube"}
            onPress={() => loadInBrowser(data.videos.links[0].uri)}
          />
        </View>
        {data.splits == null ? null : (
          <View style={styles.splitsContainer}>
            <FlatList
              ListHeaderComponent={
                <Split
                  name={"Name"}
                  duration={"Duration"}
                  finished={"Finished at"}
                />
              }
              data={splits.splits}
              renderItem={({ item }) => (
                <Split
                  name={item.name}
                  duration={item.duration}
                  finished={item.finish_time}
                />
              )}
            ></FlatList>
            <Text style={{ alignSelf: "center" }}>Powered by: splits i/o</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  video: {
    flex: 1,
  },
  title: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 20,
  },
  infocard: {
    flex: 1,
    margin: 20,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 5,
  },
  info: {
    paddingVertical: 20,
  },
  splitsContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 20,
    paddingVertical: 20,
  },
});
