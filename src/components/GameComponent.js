import React from "react";
import { Grid, Container } from "@mui/material";
import Player from "./PlayerComponent";

const Game = () => {
  return (
    <Container fixed>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Player player_name="player_1"></Player>
        </Grid>
        <Grid item xs={6}>
          <Player player_name="player_2"></Player>
        </Grid>
        <Grid item xs={6}>
          <Player player_name="player_3"></Player>
        </Grid>
        <Grid item xs={6}>
          <Player player_name="player_4"></Player>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
