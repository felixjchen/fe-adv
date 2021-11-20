import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const PlayerContext = React.createContext(() => {});

const Game = (props) => {
  let [selected_colors, set_selected_colors] = React.useState(
    props.db_selected_colors
  );
  let [available_colors, set_available_colors] = React.useState(
    props.db_available_colors
  );
  let [profile_photo_url, set_profile_photo_url] = React.useState(
    props.profile_photo_url
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

  console.log(profile_photo_url);

  return (
    <>
      <PlayerContext.Provider
        value={{
          game_select_color: select_color,
          available_colors: available_colors,
          selected_colors: selected_colors,
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

const Player = (props) => {
  const { game_select_color, available_colors, selected_colors } =
    React.useContext(PlayerContext);

  const select_color = (event) => {
    const color = event.target.value;
    game_select_color(props.player_name, color);
  };

  const options = [];

  // First, add selected color
  let selected_color = "choose color";
  if (props.player_name in selected_colors) {
    selected_color = selected_colors[props.player_name];
  }
  options.push(
    <MenuItem key={selected_color} value={selected_color}>
      {selected_color}
    </MenuItem>
  );

  // Add all availble colors to dropdown
  for (let color in available_colors) {
    if (available_colors[color]) {
      options.push(
        <MenuItem key={color} value={color}>
          {color}
        </MenuItem>
      );
    }
  }

  const style = {
    backgroundColor: selected_color,
  };
  return (
    <Container fixed style={style} className="player">
      <h4>{props.player_name}</h4>
      <hr></hr>
      <Stack>
        <Select onChange={select_color} value={selected_color}>
          {options}
        </Select>
      </Stack>
    </Container>
  );
};

export default Game;
