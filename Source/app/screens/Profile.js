import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import PB from "../components/PB";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: "",
      userid: "",
      userpicture: "",
      runs: [],
      user: [],
      country: "",
    };
  }
  async loadData() {
    const { username, userid } = this.props.route.params;
    this.setState({
      userid,
      username,
    });
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
    var country = "";
    if (userdata.data.location == null) {
      country = "";
    } else {
      country = userdata.data.location.country.names.international;
    }

    this.setState({
      loading: false,
      runs: runsdata.data,
      user: userdata.data,
      country,
    });
  }
  async componentDidMount() {
    try {
      this.loadData();
    } catch (error) {
      console.log(error);
    }
  }
  renderItem = ({ item }) => (
    <View style={styles.pbs}>
      <PB
        place={item.place}
        runnerid={item.run.players[0].id}
        time={item.run.times.primary}
        abbreviation={item.game.data.abbreviation}
        category={item.category.data.name}
        weblink={item.run.weblink}
      />
    </View>
  );

  ProfileHeader = () => {
    return (
      <View>
        <LinearGradient colors={[colors.primary, colors.primary]}>
          <View style={styles.topbar}>
            <View style={styles.topbarleft}>
              <Icon
                onPress={() => this.props.navigation.navigate("Home")}
                name="ios-arrow-back"
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
                  this.state.username +
                  "/image.png",
              }}
              style={styles.Image}
            ></Image>
          </View>
          <View style={styles.userinfo}>
            <View style={styles.userinfoitem}>
              <Text style={styles.h1}>{this.state.username}</Text>
              <View style={styles.country}>
                <View>
                  <Text style={styles.h2}>{this.state.country}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 1, margin: 10 }}>
          <View style={styles.runinfo}>
            <View style={styles.game}>
              <Text>Game</Text>
            </View>
            <View style={styles.category}>
              <Text>Category</Text>
            </View>
            <View style={styles.place}>
              <Text>Place</Text>
            </View>
            <View style={styles.time}>
              <Text>Time</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  ListFooter = () => {
    return <View style={{ padding: 20 }}></View>;
  };
  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.run.id}
        data={this.state.runs}
        renderItem={this.renderItem}
        ListHeaderComponent={this.ProfileHeader()}
        ListFooterComponent={this.ListFooter()}
      ></FlatList>
    );
  }
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

export default Profile;
