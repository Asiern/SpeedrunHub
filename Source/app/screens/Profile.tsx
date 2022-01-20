import React, { useState, useEffect, useContext } from "react";
import { View, SectionList, ActivityIndicator, Text } from "react-native";

import ProfileHeader from "../components/Profile/ProfileHeader";
import PB from "../components/PB";
import SectionHeader from "../components/SectionHeader";
import { SectionsProps, user } from "../components/Profile/helpers";

import { StatusBar } from "expo-status-bar";
import { Switch } from "react-native-gesture-handler";
import { h6 } from "../themes/theme";
import { context } from "../config/config";

export default function Profile(props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<string>("");
  const [sections, setSections] = useState<SectionsProps>();
  const [user, setUser] = useState<user>();
  const [showMisc, setShowMisc] = useState<boolean>(true);
  const { username, userid } = props.route.params;
  const { theme } = useContext(context);

  function filterPBS(data) {
    var sectionList: SectionsProps = {
      data: [], //sections
      pagination: [],
    };

    for (let run of data) {
      var counter = 0;
      var section = {
        abbreviation: "",
        name: "",
        id: "",
        data: [],
        uri: null,
      };
      if (!sectionList.pagination.includes(run.game.data.id)) {
        section.abbreviation = run.game.data.abbreviation;
        section.id = run.game.data.id;
        section.name = run.game.data.names.international;
        section.uri = run.game.data.assets["cover-large"].uri;

        sectionList.data.push(section);
        sectionList.pagination.push(run.game.data.id);
      }
      //Create run object
      var r = {
        key: counter.toString(),
        place: run.place,
        runnerid: run.run.players[0].id,
        time: run.run.times.primary,
        category: run.category.data.name,
        weblink: run.run.weblink,
        misc: run.category.data.miscellaneous,
      };
      counter++;
      //Push data
      var index = sectionList.pagination.indexOf(run.game.data.id);
      sectionList.data[index].data.push(r);
    }

    setSections(sectionList);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoading(true);
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
        setUser(userdata.data);
        if (userdata.data.location != null) {
          setCountry(userdata.data.location.country.names.international);
        }
        filterPBS(runsdata.data);
        setLoading(false);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [showMisc]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", flex: 1 }}
        size="large"
        color={theme.colors.primary}
      />
    );
  } else {
    return (
      <>
        <StatusBar style={"dark"}></StatusBar>
        <SectionList
          sections={sections.data}
          keyExtractor={(item, index) => item.key + index}
          ListFooterComponent={<View style={{ paddingTop: 20 }} />}
          ListHeaderComponent={
            <>
              <ProfileHeader
                username={username}
                country={country}
                image={user.assets.image.uri}
                signup={user.signup}
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[h6, { color: theme.colors.text, marginRight: 10 }]}
                >
                  Show misc. categories
                </Text>
                <Switch
                  value={showMisc}
                  onValueChange={() => setShowMisc(!showMisc)}
                />
              </View>
            </>
          }
          renderItem={({ item }) => {
            if (!showMisc && item.misc) {
              return null;
            } else {
              return (
                <PB
                  place={item.place}
                  time={item.time}
                  category={item.category}
                  weblink={item.weblink}
                />
              );
            }
          }}
          renderSectionHeader={({ section }) => (
            <SectionHeader
              abbreviation={section.abbreviation}
              id={section.id}
              name={section.name}
              uri={section.uri}
            />
          )}
        />
      </>
    );
  }
}
