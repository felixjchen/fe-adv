import React from "react";

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
    <div>
      <h1 id="title">Game </h1>

      <PlayerContext.Provider
        value={{
          game_select_color: select_color,
          available_colors: available_colors,
          selected_colors: selected_colors,
        }}
      >
        <div id="player_grid">
          <div>
            <Player
              player_name="player_1"
              selected_colors={selected_colors}
            ></Player>
            <Player
              player_name="player_2"
              selected_colors={selected_colors}
            ></Player>
          </div>
          <div>
            <Player
              player_name="player_3"
              selected_colors={selected_colors}
            ></Player>
            <Player
              player_name="player_4"
              selected_colors={selected_colors}
            ></Player>
          </div>
        </div>
      </PlayerContext.Provider>
    </div>
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
    <option key={selected_color} value={selected_color}>
      {selected_color}
    </option>
  );

  // Add all availble colors to dropdown
  for (let color in available_colors) {
    if (available_colors[color]) {
      options.push(
        <option key={color} value={color}>
          {color}
        </option>
      );
    }
  }

  const style = {
    backgroundColor: selected_color,
  };
  return (
    <div style={style} className="player">
      <h4>{props.player_name}</h4>
      <hr></hr>
      <select onChange={select_color}>{options}</select>
    </div>
  );
};