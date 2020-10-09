import React, { useState, useEffect } from "react";
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

import { useSelector } from "react-redux";
const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [Loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
        if (LOGGEDIN == "true") {
          setLoggedin(true);
          setLoading(false);
        } else if (LOGGEDIN == "false") {
          setLoggedin(false);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [Loggedin]);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <Provider store={store}>
        {Loggedin == true ? (
          <Navigation function={() => setLoggedin()} />
        ) : (
          <Login function={() => setLoggedin()} />
        )}
      </Provider>
    );
  }
}
