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
import IndexContext from "./contexts/IndexContext";
import MyRoutes from "./routes/routes";
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

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

  const IndexContextValue = {
    db_selected_colors,
    db_available_colors,
    profile_photo_url,
    user_email: user.email,
    setSelectedColorsDB,
    signOut,
    uploadProfilePhoto,
  };
  ReactDOM.render(
    <React.StrictMode>
      <IndexContext.Provider value={IndexContextValue}>
        <BrowserRouter>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/game">Game</Link>
            <Button
              variant="contained"
              onClick={signOut}
              style={{ float: "right" }}
            >
              Sign Out
            </Button>
          </nav>
          <Outlet />
          <MyRoutes></MyRoutes>
        </BrowserRouter>
      </IndexContext.Provider>
    </React.StrictMode>,
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
