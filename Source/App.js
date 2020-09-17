import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigation from "./app/screens/Navigation";
import Login from "./app/screens/Login";
import { ActivityIndicator } from "react-native";

//Themes
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./app/redux/themeReducer";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);
//Dark mode https://www.npmjs.com/package/react-native-dark-mode

export default class App extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      Loggedin: false,
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
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
