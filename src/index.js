import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebaseConfig from "./config";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// https://github.com/firebase/firebaseui-web/pull/850
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const authui = new firebaseui.auth.AuthUI(auth);
console.log({ app, auth, authui });
const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  tosUrl: "/",
  privacyPolicyUrl: function () {
    window.location.assign("/");
  },
};

firebase.auth().onAuthStateChanged((user) => {
  console.log({ user });

  if (user != null) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
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
