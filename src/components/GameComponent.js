import React, { useState, useContext } from "react";
import { Grid, Container } from "@mui/material";
import Player from "./PlayerComponent";
import { RootContext } from "../contexts/RootContext";

const Game = () => {
  let index_context = useContext(RootContext);

  let [selected_colors, set_selected_colors] = useState(
    index_context.db_selected_colors
  );
  let [available_colors, set_available_colors] = useState(
    index_context.db_available_colors
  );

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
    index_context.setSelectedColorsDB({ selected_colors: new_selected_colors });
    set_selected_colors(new_selected_colors);
  };

  const player_props = {
    select_color,
    available_colors,
    selected_colors,
  };

  return (
    <>
      <Container fixed>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Player player_name="player_1" {...player_props}></Player>
          </Grid>
          <Grid item xs={6}>
            <Player player_name="player_2" {...player_props}></Player>
          </Grid>
          <Grid item xs={6}>
            <Player player_name="player_3" {...player_props}></Player>
          </Grid>
          <Grid item xs={6}>
            <Player player_name="player_4" {...player_props}></Player>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Game;
