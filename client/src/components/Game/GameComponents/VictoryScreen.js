import React, { useEffect } from "react";
import "./styles/VictoryScreen.css";
import moneyend from "../../../imgs/moneyend.mp4";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function LeaderboardPlayers(props) {
  console.log(props);
  const playerRankColors = {
    1: "#FFD700",
    2: "#C0C0C0",
  };

  const rankColor = playerRankColors[props.playerRank] || "#ffffff"; // Default to black if no matching rank color

  const playerRankStyle = {
    // Create an object to set the text color dynamically
    color: rankColor,
  };

  return (
    <li className="player-item-style">
      <h2 className="playerrank-style" style={playerRankStyle}>
        {props.playerRank}
      </h2>
      <div className="playerName-and-playerTotalMoney">
        <h3 className="playername-style">{props.playerName}</h3>
        <h4 className="playermoney-style">{props.playerTotalMoney}</h4>
      </div>
    </li>
  );
}
function VictoryScreen() {
  const location = useLocation();
  const endGameInfo = location.state;
  const navigate = useNavigate();
  const initialPlayers = [
    {
      playerRank: "1",
      playerName: "N/A",
      playerTotalMoney: 33323,
    },
    {
      playerRank: "2",
      playerName: "N/A",
      playerTotalMoney: 32131,
    },
  ];

  const [players, setPlayers] = useState(initialPlayers);
  useEffect(() => {
    setPlayers((prevState) =>
      prevState.map((obj) =>
        obj.playerRank === "1"
          ? {
              ...obj,
              playerName: endGameInfo.state.winner.logs.name,
              playerTotalMoney: `$ ${parseFloat(
                endGameInfo.state.winner.logs.money.toFixed(2)
              )}`,
            }
          : {
              ...obj,
              playerName: endGameInfo.state.loser.logs.name,
              playerTotalMoney: `$ ${parseFloat(
                endGameInfo.state.loser.logs.money.toFixed(2)
              )}`,
            }
      )
    );
  }, []);

  return (
    <div className="victory-screen-style scale-in-center">
      <video muted autoPlay loo id="my-Video-background">
        <source src={moneyend} type="video/mp4" />
      </video>
      <h1 className="congrats-style">GAME OVER!</h1>
      <ul className="leaderboard-style">
        {players.map((player) => (
          <LeaderboardPlayers
            playerRank={player.playerRank}
            playerName={player.playerName}
            playerTotalMoney={player.playerTotalMoney}
          />
        ))}
      </ul>
      <button
        className="button-style"
        onClick={() => {
          navigate("/");
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default VictoryScreen;
