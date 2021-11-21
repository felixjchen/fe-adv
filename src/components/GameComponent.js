import { React, useState, useContext } from "react";
import { Grid, Button, Container } from "@mui/material";
import Player from "./PlayerComponent";
import PlayerContext from "../contexts/PlayerContext";
import IndexContext from "../contexts/IndexContext";

const Game = () => {
  let index_context = useContext(IndexContext);

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

  return (
    <>
      <PlayerContext.Provider
        value={{
          select_color,
          available_colors,
          selected_colors,
        }}
      >
        <Container fixed>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Player
                player_name="player_1"
                selected_colors={selected_colors}
              ></Player>
            </Grid>
            <Grid item xs={6}>
              <Player
                player_name="player_2"
                selected_colors={selected_colors}
              ></Player>
            </Grid>
            <Grid item xs={6}>
              <Player
                player_name="player_3"
                selected_colors={selected_colors}
              ></Player>
            </Grid>
            <Grid item xs={6}>
              <Player
                player_name="player_4"
                selected_colors={selected_colors}
              ></Player>
            </Grid>
          </Grid>
        </Container>
      </PlayerContext.Provider>
    </>
  );
};

export default Game;
