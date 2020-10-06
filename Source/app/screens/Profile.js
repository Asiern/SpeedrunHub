import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "@expo/vector-icons/Feather";
import Constants from "expo-constants";

import colors from "../config/colors";
import PB from "../components/PB";
import SectionHeader from "../components/SectionHeader";

const { width } = Dimensions.get("screen");

export default function Profile(props) {
  const [country, setCountry] = useState("");
  const [sections, setSections] = useState([]);
  const { username, userid } = props.route.params;

  function filterPBS(data) {
    var sectionList = {
      data: [], //sections
      pagination: [],
    };
    for (let run of data) {
      var section = {
        abbreviation: "",
        id: "",
        data: [],
      };
      if (!sectionList.pagination.includes(run.game.data.id)) {
        section.abbreviation = run.game.data.abbreviation;
        section.id = run.game.data.id;

        sectionList.data.push(section);
        sectionList.pagination.push(run.game.data.id);
      }
      //Create run object
      var r = {
        place: run.place,
        runnerid: run.run.players[0].id,
        time: run.run.times.primary,
        category: run.category.data.name,
        weblink: run.run.weblink,
      };
      //Push data
      var index = sectionList.pagination.indexOf(run.game.data.id);
      sectionList.data[index].data.push(r);
    }

    setSections(sectionList);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //PBs
        const runsurl =
          "https://www.speedrun.com/api/v1/users/" +
          userid +
          "/personal-bests?embed=game,category";
        const runsresponse = await fetch(runsurl);
        const runsdata = await runsresponse.json();
        //User
        const userurl = "https://www.speedrun.com/api/v1/users/" + userid;
        const userresponse = await fetch(userurl);
        const userdata = await userresponse.json();
        if (userdata.data.location != null) {
          setCountry(userdata.data.location.country.names.international);
        }
        filterPBS(runsdata.data);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);
  ProfileHeader = () => {
    return (
      <View>
        <LinearGradient colors={[colors.primary, colors.primary]}>
          <View style={styles.topbar}>
            <View style={styles.topbarleft}>
              <Feather
                onPress={() => props.navigation.navigate("Home")}
                name="arrow-left"
                color={colors.white}
                size={35}
                style={{ paddingLeft: 20 }}
              />
            </View>
            <View style={styles.topbarcenter}></View>
            <View style={styles.topbarright}></View>
          </View>
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri:
                  "https://www.speedrun.com/themes/user/" +
                  username +
                  "/image.png",
              }}
              style={styles.Image}
            ></Image>
          </View>
          <View style={styles.userinfo}>
            <View style={styles.userinfoitem}>
              <Text style={styles.h1}>{username}</Text>
              <View style={styles.country}>
                <View>
                  <Text style={styles.h2}>{country}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  ListFooter = () => {
    return <View style={{ padding: 20 }}></View>;
  };

  return (
    <SectionList
      sections={sections.data}
      keyExtractor={(item, index) => item + index}
      ListHeaderComponent={ProfileHeader()}
      ListFooterComponent={ListFooter()}
      renderItem={({ item }) => (
        <PB
          place={item.place}
          runnerid={item.userid}
          runner={username}
          time={item.time}
          category={item.category}
          weblink={item.weblink}
        />
      )}
      renderSectionHeader={({ section }) => (
        <SectionHeader abbreviation={section.abbreviation} width={width} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
  },
  profile: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  h1: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  headertext: {
    color: colors.light,
    backgroundColor: colors.Crystalline1,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    borderRadius: 15,
    padding: 10,
  },
  pbs: {
    flex: 1,
    marginHorizontal: 10,
  },
  runinfo: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  game: {
    flex: 3,
    //backgroundColor: "dodgerblue",
    alignItems: "center",
  },
  category: {
    flex: 5,
    //backgroundColor: "gold"
    alignItems: "center",
  },
  place: {
    flex: 3,
    //backgroundColor: "tomato",
    alignItems: "center",
  },
  runner: {
    flex: 5,
    //backgroundColor: "green",
    alignItems: "center",
  },
  time: {
    flex: 8,
    //backgroundColor: "orange",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    height: 45,
    alignSelf: "center",
  },
  buttontext: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    textAlign: "center",
    color: colors.darkgrey,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 5,
  },
});
