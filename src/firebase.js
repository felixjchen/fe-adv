import firebase_config from "./config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import "firebase/compat/storage";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// https://github.com/firebase/firebaseui-web/pull/850
const app = firebase.initializeApp(firebase_config);
const functions = app.functions();
const auth = app.auth();
const authui = new firebaseui.auth.AuthUI(auth);

// functions.useEmulator("localhost", "5001");

const authui_config = {
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
export {
  signOut,
  getSelectedColorsDB,
  setSelectedColorsDB,
  authui_config,
  app,
  auth,
  authui,
};
