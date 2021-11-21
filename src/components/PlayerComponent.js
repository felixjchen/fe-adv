import { React, useContext } from "react";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import PlayerContext from "../contexts/PlayerContext";

const Player = (props) => {
  const { select_color, available_colors, selected_colors } =
    useContext(PlayerContext);

  const select_color_onclick = (event) => {
    const color = event.target.value;
    select_color(props.player_name, color);
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
        <Select onChange={select_color_onclick} value={selected_color}>
          {options}
        </Select>
      </Stack>
    </Container>
  );
};

export default Player;
