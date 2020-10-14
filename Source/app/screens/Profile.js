import React, { useState, useEffect } from "react";
import { View, SectionList, Dimensions } from "react-native";

import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import ProfileHeader from "../components/ProfileHeader";
import PB from "../components/PB";
import SectionHeader from "../components/SectionHeader";

const { width } = Dimensions.get("screen");

export default function Profile(props) {
  const [country, setCountry] = useState("");
  const [sections, setSections] = useState([]);
  const { username, userid } = props.route.params;

  const theme = useSelector((state) => state.themeReducer.theme);

  function filterPBS(data) {
    var sectionList = {
      data: [], //sections
      pagination: [],
    };
    for (let run of data) {
      var section = {
        abbreviation: "",
        name: "",
        id: "",
        data: [],
      };
      if (!sectionList.pagination.includes(run.game.data.id)) {
        section.abbreviation = run.game.data.abbreviation;
        section.id = run.game.data.id;
        section.name = run.game.data.names.international;

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

  ListFooter = () => {
    return <View style={{ padding: 20 }}></View>;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SectionList
          sections={sections.data}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={
            <ProfileHeader
              username={username}
              country={country}
              navigation={props.navigation}
            />
          }
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
            <SectionHeader
              abbreviation={section.abbreviation}
              id={section.id}
              name={section.name}
              width={width}
              navigation={props.navigation}
            />
          )}
        />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.SECONDARY_BACKGROUND};
`;
