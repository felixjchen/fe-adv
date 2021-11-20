import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebaseConfig from "./config";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// https://github.com/firebase/firebaseui-web/pull/850
const app = firebase.initializeApp(firebaseConfig);
const functions = app.functions();
const auth = app.auth();
const authui = new firebaseui.auth.AuthUI(auth);

functions.useEmulator("localhost", "5001");

console.log({ app, auth, authui, functions });
const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  tosUrl: "/",
  privacyPolicyUrl: function () {
    window.location.assign("/");
  },
};

const getSelectedColorsDB = functions.httpsCallable("getSelectedColors");
const setSelectedColorsDB = functions.httpsCallable("setSelectedColors");

firebase.auth().onAuthStateChanged(async (user) => {
  console.log({ user });
  const db_selected_colors = (await getSelectedColorsDB()).data;
  const db_available_colors = {
    blue: true,
    red: true,
    yellow: true,
    orange: true,
    purple: true,
    grey: true,
    green: true,
  };
  for (let player in db_selected_colors) {
    db_available_colors[db_selected_colors[player]] = false;
  }
  console.log({ db_selected_colors });

  if (user != null) {
    ReactDOM.render(
      <React.StrictMode>
        <App
          db_selected_colors={db_selected_colors}
          db_available_colors={db_available_colors}
          setSelectedColorsDB={setSelectedColorsDB}
        />
      </React.StrictMode>,
      document.getElementById("root")
    );
  } else {
    authui.start("#root", uiConfig);
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
