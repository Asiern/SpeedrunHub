import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import colors from "../config/colors";

const Run = (props) => {
  const [runner, setRunner] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetch(
        "https://www.speedrun.com/api/v1/users/" + props.runnerid
      );
      const data = await response.json();
      if (mounted) {
        setRunner(data.data.names.international);
        setloading(false);
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, []);
  function loadInBrowser(link) {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  }
  function timeConverter(time) {
    var result = time.toLowerCase();
    return result.substr(2, result.lenght);
  }
  return (
    <TouchableOpacity
      onPress={() => loadInBrowser(props.weblink)}
      style={styles.container}
    >
      <View style={styles.place}>
        <Text style={styles.accenttext}>{props.place}</Text>
      </View>
      <View style={styles.runner}>
        {loading ? (
          <Text>...loading</Text>
        ) : (
          <Text style={styles.text}>{runner}</Text>
        )}
      </View>
      <View style={styles.time}>
        <Text style={styles.text}>{timeConverter(props.time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  place: {
    flex: 3,
    alignItems: "center",
  },
  runner: {
    flex: 8,
    alignItems: "center",
  },
  time: {
    flex: 8,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.primary,
  },
});

export default Run;
