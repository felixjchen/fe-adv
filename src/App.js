import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

const PlayerContext = React.createContext(() => {});
const COLORS = {
  blue: true,
  red: true,
  yellow: true,
  orange: true,
  purple: true,
  grey: true,
  green: true,
};

export default function BasicExample() {
  return <Game />;
}
const Game = () => {
  let [selected_colors, set_selected_colors] = React.useState({});
  let [available_colors, set_available_colors] = React.useState(COLORS);

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
    set_selected_colors(new_selected_colors);
  };

  return (
    <>
      <PlayerContext.Provider
        value={{
          game_select_color: select_color,
          available_colors: available_colors,
          selected_colors: selected_colors,
        }}
      >
        <Container fixed>
          <Box>
            <h1>Game </h1>
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

  // First , add selected color
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
        <Select onChange={select_color} defaultValue={"choose color"}>
          {options}
        </Select>
      </Stack>
    </Container>
  );
};
