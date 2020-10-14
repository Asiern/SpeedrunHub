import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { AppLoading } from "expo"

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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [Loggedin, setLoggedin] = useState(false);

  async function getData(){
    const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
        if (LOGGEDIN == "true") {
          setLoggedin(true);
        } else  {
          setLoggedin(false);
        }
  }

  if (loading) {
    return <AppLoading
    startAsync={getData}
    onFinish={() => setLoading(false)}
    onError={console.warn}
  />;
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
