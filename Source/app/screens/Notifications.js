import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import NotificationCard from "../components/NotificationCard";
import { ActivityIndicator } from "react-native-paper";
import colors from "../config/colors";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const { data } = this.props.route.params;
    this.setState({ data });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.data}
          pagingEnabled
          renderItem={({ item }) => (
            <View>
              {item.status == "read" ? (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.text}
                    backgroundColor={colors.white}
                    color={colors.darkgrey}
                  />
                </Animated.View>
              ) : (
                <Animated.View>
                  <NotificationCard
                    width={props.width}
                    text={item.text}
                    backgroundColor={colors.primary}
                    color={colors.white}
                  />
                </Animated.View>
              )}
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
});
export default Notifications;
