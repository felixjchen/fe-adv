import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebaseConfig from "./config";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import "firebase/compat/storage";
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

const signOut = () => {
  const auth = app.auth();
  auth.signOut();
};

auth.onAuthStateChanged((user) => {
  if (user != null) {
    render_game(user);
  } else {
    ReactDOM.render(<></>, document.getElementById("root"));
    authui.start("#root", uiConfig);
  }
});

const render_game = async (user) => {
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

  const uploadProfilePhoto = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = app.storage();
      const storage_ref = storage.ref(user.email);
      const upload_task = storage_ref.put(file);
      upload_task.on("state_changed", {
        error: (error) => {
          console.error(error);
          reject(error);
        },
        complete: async () => {
          resolve(await storage_ref.getDownloadURL());
        },
      });
    });
  };

  let profile_photo_url = "";
  try {
    const storage = app.storage();
    const storage_ref = storage.ref(user.email);
    profile_photo_url = await storage_ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App
        db_selected_colors={db_selected_colors}
        db_available_colors={db_available_colors}
        profile_photo_url={profile_photo_url}
        user_email={user.email}
        setSelectedColorsDB={setSelectedColorsDB}
        signOut={signOut}
        uploadProfilePhoto={uploadProfilePhoto}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
