import { React, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Grid, Stack, Button } from "@mui/material";
import Player from "./PlayerComponent";
import PlayerContext from "../contexts/PlayerContext";

const Game = (props) => {
  let [profile_photo_url, set_profile_photo_url] = useState(
    props.profile_photo_url
  );
  let [selected_colors, set_selected_colors] = useState(
    props.db_selected_colors
  );
  let [available_colors, set_available_colors] = useState(
    props.db_available_colors
  );

  const upload_profile_photo = async (file) => {
    const new_profile_photo_url = await props.uploadProfilePhoto(file);
    set_profile_photo_url(new_profile_photo_url);
  };

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
    props.setSelectedColorsDB({ selected_colors: new_selected_colors });
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
        <Button
          variant="contained"
          onClick={props.signOut}
          style={{ float: "right" }}
        >
          Sign Out
        </Button>

        <Container fixed>
          <Box>
            <h1>Welcome {props.user_email} </h1>

            <Container fixed>
              <Stack style={{ maxWidth: "10rem", margin: "auto" }}>
                <img src={profile_photo_url}></img>
                <Button variant="contained" component="label">
                  Upload Profile File
                  <input
                    type="file"
                    onChange={(e) => upload_profile_photo(e.target.files[0])}
                    hidden
                  />
                </Button>
              </Stack>
            </Container>
          </Box>
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
