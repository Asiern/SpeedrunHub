import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigation from "./app/screens/Navigation";
import Login from "./app/screens/Login";

export default class App extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      Loggedin: true,
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const Loggedin = await AsyncStorage.getItem("@Loggedin");

      if (Loggedin == "true") {
        this.setState({ Loggedin: true });
      } else if (Loggedin == "false") {
        this.setState({ Loggedin: false });
      } else {
        null;
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.Loggedin) {
      return <Navigation />;
    } else {
      return <Login />;
    }
  }
}
