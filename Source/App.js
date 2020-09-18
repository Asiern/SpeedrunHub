import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";

//Screens
import Navigation from "./app/screens/Navigation";
import Login from "./app/screens/Login";

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
  reset() {
    this.setState({ reset: true });
    console.log("RESET FUNCTION");
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      try {
        //Load themes
        //const theme = await AsyncStorage.getItem("@Theme");
        //Load theme using dispatcher
        const Loggedin = await AsyncStorage.getItem("@Loggedin");

        if (Loggedin == "true") {
          this.setState({ Loggedin: true, loading: false });
        } else if (Loggedin == "false") {
          this.setState({ Loggedin: false, loading: false });
        } else {
          this.setState({ loading: false });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <Provider store={store}>
          {this.state.Loggedin == true ? (
            <Navigation reload={() => this.reset()} />
          ) : (
            <Login reload={() => this.reset()} />
          )}
        </Provider>
      );
    }
  }
}
