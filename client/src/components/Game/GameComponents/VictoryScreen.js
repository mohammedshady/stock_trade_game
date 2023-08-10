import React from "react";
import "./styles/VictoryScreen.css";
// import vid from "../video/vid.mp4";
import { useNavigate } from "react-router-dom";

function LeaderboardPlayers(props) {
  const playerRankColors = {
    1: "#FFD700",
    2: "#C0C0C0",
    3: "#CD7F32",
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
const handlePlayAgain = () => {};
function VictoryScreen() {
  const navigate = useNavigate();
  const initialPlayers = [
    {
      playerRank: "1",
      playerName: "N/A",
      playerTotalMoney: "$32323",
    },
    {
      playerRank: "2",
      playerName: "N/A",
      playerTotalMoney: "$3434",
    },
    {
      playerRank: "3",
      playerName: "N/A",
      playerTotalMoney: "$2323",
    },
    {
      playerRank: "4",
      playerName: "N/A",
      playerTotalMoney: "$5656",
    },
  ];

  const [players, setPlayers] = React.useState(initialPlayers);

  return (
    <div className="victory-screen-style scale-in-center">
      <video autoPlay loop muted />
      <h1 className="congrats-style">GAME OVER!</h1>
      <h1>{initialPlayers[0].playerName} has won the game!</h1>
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
