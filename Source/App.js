import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigation from "./app/screens/Navigation";
import Login from "./app/screens/Login";
import { ActivityIndicator } from "react-native";

//Dark mode https://www.npmjs.com/package/react-native-dark-mode

export default class App extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      Loggedin: true,
      loading: true,
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const Loggedin = await AsyncStorage.getItem("@Loggedin");

      if (Loggedin == "true") {
        this.setState({ Loggedin: true, loading: false });
      } else if (Loggedin == "false") {
        this.setState({ Loggedin: false, loading: false });
      } else {
        null;
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else if (this.state.Loggedin) {
      return <Navigation />;
    } else {
      return <Login />;
    }
  }
}
