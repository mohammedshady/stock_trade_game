// import logo from "./logo.svg";
import { useState } from "react";
import "./styles/PreGame.css";
import axios from "axios";
import { useUser } from "../context/SetUser";
import { useNavigate } from "react-router-dom";
// import clap from "./clap.gif";
import { useLocation } from "react-router-dom";
const botId = "f6149180-4c4b-4abc-bbc3-45d99e36a9e4";
function PreGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameData = location.state && location.state.gameData;
  const { user } = useUser();
  const [error, setError] = useState("");
  const [gameSettings, setGameSettings] = useState({
    mode: "bot",
    duration: "5",
    tickRate: "24",
  });
  const updateGameSettings = async (newGame) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/game/game/update",
        newGame
      );
      console.log("Updated Game Settings");
      return response.data;
    } catch (error) {
      console.error("Error updating Game Settings:", error.message);
      setError("Error updating Game Settings.");
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setGameSettings((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newGame = {
      id: gameData.game.id,
      gameInfo: {
        settings: gameSettings,
        players: {
          [user.id]: { data: {}, moves: [] },
          [botId]: { data: {}, moves: [] },
        },
      },
    };
    await updateGameSettings(newGame);
    navigate("/game", { state: { gameData } });
  };
  return (
    <div className="App1">
      <header className="App-header1">
        <form onSubmit={handleFormSubmit}>
          <div className="bigScreen">
            <div className="upperScreen">
              <div className="upperTop">
                <div className="upperLeft">
                  <text>Game </text>
                  <br></br>
                  <text className="settingsText"> Settings</text>
                </div>
                <div className="upperRight">{/* <img src={clap} /> */}</div>
              </div>
              <div className="upperBootom">
                <h3>Game Code</h3>

                <input
                  className="game-input"
                  type="text"
                  value={"Game-" + gameData.game.id.slice(0, 4)}
                  disabled
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="bottomScreen">
              <div className="bottomUp">
                <div className="bottomLeft">
                  <div className="dropdown">
                    {/* <button class="dropbtn">Tick Rate</button>
                  <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div> */}
                    <div className="input-setting-game-container">
                      <p>Game Mode</p>
                      <select
                        name="mode"
                        value={gameSettings.mode}
                        onChange={handleSelectChange}
                      >
                        <option value="bot"> x Bot</option>
                        <option value="multi">Multiplayer</option>
                      </select>
                    </div>
                  </div>
                  <div className="dropdown">
                    {/* <button class="dropbtn">Duration</button>
                  <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div> */}
                    <div className="input-setting-game-container">
                      <p>Duration</p>
                      <select
                        name="duration"
                        value={gameSettings.duration}
                        onChange={handleSelectChange}
                      >
                        <option value="10">10 min</option>
                        <option value="5">5 min</option>
                      </select>
                    </div>
                  </div>
                  <div className="dropdown">
                    {/* <button class="dropbtn">Mode</button>
                  <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div> */}
                    <div className="input-setting-game-container">
                      <p>Tick Rate</p>
                      <select
                        name="tickRate"
                        value={gameSettings.tickRate}
                        onChange={handleSelectChange}
                      >
                        <option value="24">24 sec</option>
                        <option value="12">12 sec</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bottomRight">
                  <h1>Hints..</h1>
                  <text>
                    Trading Strategies: Implement various trading strategies,
                    such as aggressive, conservative, and balanced approaches,
                    for players to choose from. Strategies can be based on
                    factors like stock trends, market news, and financial
                    indicators.
                  </text>
                  <br />
                  <br />
                  <text>
                    Risk Management and Diversification: Encourage risk
                    management by setting budget constraints and limiting total
                    investment in a single stock. Promote diversification to
                    spread risk across different stocks in the player's
                    portfolio.
                  </text>
                  <br />
                  <br />
                  <text>
                    Realism and Engagement: Create a realistic stock trading
                    experience with real-time market updates, challenges,
                    events, and competitive elements. Provide feedback,
                    guidance, and research tools to help players improve their
                    trading skills and make informed decisions.
                  </text>
                </div>
              </div>
              <div className="bottomLow">
                <button className="button1">JOIN GAME</button>
              </div>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
}

export default PreGame;
