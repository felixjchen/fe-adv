import MyRoutes from "../routes/routes";
import { BrowserRouter } from "react-router-dom";
import Nav from "./NavComponent";
import React, { useState } from "react";
import { RootContextProvider } from "../contexts/RootContext";

const Root = (props) => {
  let { db_selected_colors, db_available_colors, setSelectedColorsDB } = props;

  let [selected_colors, set_selected_colors] = useState(db_selected_colors);
  let [available_colors, set_available_colors] = useState(db_available_colors);

  const select_color = (player, color) => {
    console.log(`${player} choose ${color}`);
    const new_selected_colors = { ...selected_colors };
    const new_available_colors = { ...available_colors };
    // free old color
    if (player in new_selected_colors) {
      const old_color = new_selected_colors[player];
      new_available_colors[old_color] = true;
    }
    // take new color
    new_available_colors[color] = false;
    new_selected_colors[player] = color;
    set_available_colors(new_available_colors);
    setSelectedColorsDB({ selected_colors: new_selected_colors });
    set_selected_colors(new_selected_colors);
  };

  const RootContextProviderValue = {
    ...props,
    select_color,
    available_colors,
    selected_colors,
  };
  return (
    <RootContextProvider
      value={RootContextProviderValue}
      children={
        <React.StrictMode>
          <BrowserRouter>
            <Nav></Nav>
            <MyRoutes></MyRoutes>
          </BrowserRouter>
        </React.StrictMode>
      }
    ></RootContextProvider>
  );
};

export default Root;
