import React from "react";

const PlayerContext = React.createContext(() => {});
const Colors = {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected_colors: {}, available_colors: Colors };
  }

  select_color = (player, color) => {
    console.log(`${player} choose ${color}`);
    let new_state = this.state;

    // free old color
    if (player in new_state.selected_colors) {
      const old_color = new_state.selected_colors[player];
      new_state.available_colors[old_color] = true;
    }
    // take new color
    new_state.available_colors[color] = false;
    new_state.selected_colors[player] = color;

    this.setState(new_state);
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1 id="title">Game </h1>

        <PlayerContext.Provider
          value={{
            game_select_color: this.select_color,
            available_colors: this.state.available_colors,
            selected_colors: this.state.selected_colors,
          }}
        >
          <div id="player_grid">
            <div>
              <Player player_name="player_1"></Player>
              <Player player_name="player_2"></Player>
            </div>
            <div>
              <Player player_name="player_3"></Player>
              <Player player_name="player_4"></Player>
            </div>
          </div>
        </PlayerContext.Provider>
      </div>
    );
  }
}

const Player = (props) => {
  const { game_select_color, available_colors, selected_colors } =
    React.useContext(PlayerContext);

  const select_color = (event) => {
    const color = event.target.value;
    game_select_color(props.player_name, color);
  };

  const options = [];

  let selected_color = "choose color";
  if (props.player_name in selected_colors) {
    selected_color = selected_colors[props.player_name];
  }
  options.push(
    <option key={selected_color} value={selected_color}>
      {selected_color}
    </option>
  );

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
