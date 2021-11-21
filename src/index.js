import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  signOut,
  getSelectedColorsDB,
  setSelectedColorsDB,
  authui_config,
  app,
  auth,
  authui,
} from "./firebase";
import Root from "./components/RootComponent";

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

  const root_props = {
    db_selected_colors,
    db_available_colors,
    profile_photo_url,
    user_email: user.email,
    setSelectedColorsDB,
    signOut,
    uploadProfilePhoto,
  };
  ReactDOM.render(
    <Root {...root_props}></Root>,
    document.getElementById("root")
  );
};

auth.onAuthStateChanged((user) => {
  if (user != null) {
    render_game(user);
  } else {
    ReactDOM.render(<></>, document.getElementById("root"));
    authui.start("#root", authui_config);
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
