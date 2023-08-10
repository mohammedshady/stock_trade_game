import React, { useEffect, useState } from "react";
import "./styles/GameBoard.css";
import Market from "./GameComponents/Market";
import Stocks from "./GameComponents/stocks";
import StockHistory from "./GameComponents/StockHistory";
import PlayerCard from "./GameComponents/PlayerCard";
import axios from "axios";
import { useUser } from "../context/SetUser";
import ibmLogo from "../../imgs/ibmImg.png";
import msftLogo from "../../imgs/msftImg.png";
import metaLogo from "../../imgs/metaImg.png";
import jpmLogo from "../../imgs/jpmImg.png";
import tslaLogo from "../../imgs/teslaImg.png";
import { Await, useLocation } from "react-router-dom";
import VictoryScreen from "./GameComponents/VictoryScreen";
import handleBotRequest from "../../helpers/botRequestHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const buyRoute = "http://localhost:3000/api/game/buy-stock";
const sellRoute = "http://localhost:3000/api/game/sell-stock";

const {
  formatStocksData,
  formatPricesData,
} = require("../../helpers/dataFormater");

function GameBoard() {
  const location = useLocation();
  const gameData = location.state && location.state.gameData;
  const notify = (text) => toast(text);
  const stocksHistory = [
    {
      key: "MSFT",
      name: "Microsoft Corp",
      logo: msftLogo,
      prices: [],
    },
    {
      key: "IBM",
      name: "International Business Machines Corp",
      logo: ibmLogo,
      prices: [],
    },
    {
      key: "META",
      name: "Meta Platforms, Inc.",
      logo: metaLogo,
      prices: [],
    },
    {
      key: "JPM",
      name: "JPMorgan Chase & Co.",
      logo: jpmLogo,
      prices: [],
    },
    {
      key: "TSLA",
      name: "Tesla, Inc",
      logo: tslaLogo,
      prices: [],
    },
  ];
  const { user } = useUser();
  const [stocksDataHistory, setStocksDataHistory] = useState(stocksHistory);
  const [ownedstocksData, setownedStocksData] = useState([]);
  const [botStocksData, setBotStocksData] = useState(null);
  const [stocksData, setStocksData] = useState([]);
  const [userMoves, setUserMoves] = useState([]);
  const [botData, setBotData] = useState({});
  const [botMoves, setBotMoves] = useState([]);
  const [day, setDay] = useState(700);
  const [seconds, setSeconds] = useState(300);
  const [currentDate, setCurrentDate] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  console.log(gameEnded);

  const botId = "f6149180-4c4b-4abc-bbc3-45d99e36a9e4";
  const flaskUrl = "http://127.0.0.1:5000";

  const getNextDateFromNow = (inputDate) => {
    console.log(inputDate);
    const nextDate = new Date(inputDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateString = nextDate.toISOString().split("T")[0];
    console.log(nextDateString);
    return nextDateString;
  };
  const handleUserMoveMarket = (move) => {
    setUserMoves((prev) => [...prev, move]);
    getBotAction();
  };
  if (!user.id) {
    console.log("cannot find user Login Again");
  }
  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setTimeout(() => {
      setGameEnded(true);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the timer when the component unmounts or game ends
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDay((prev) => prev - 1);
    }, 24000); // 24000 milliseconds = 24 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // const playerID = ??
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/users/player/${user?.id}/stocks`)
      .then((response) => {
        setownedStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //prob here
  }, [user, userMoves]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/users/player/${botId}/stocks`)
      .then((response) => {
        setBotStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (botMoves.length > 0) {
      console.log(botMoves[0]);
      notify(
        "The Bot did a " +
          botMoves[botMoves.length - 1].action +
          " action for stock " +
          botMoves[botMoves.length - 1].stockKey
      );
    }

    //prob here
  }, [botMoves]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/game/stocks", { day })
      .then((response) => {
        setStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:3000/api/game/stocksDate/${day}`)
      .then((response) => {
        setCurrentDate(response.data.date);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [day]);

  useEffect(() => {
    if (gameEnded === true) {
      axios
        .put(`http://localhost:3000/api/game/game/end`, {
          gameId: gameData.game.id,
          day: day,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [gameEnded]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/users/${botId}`)
      .then((response) => {
        setBotData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/api/game/stocks-history/150")
      .then((response) => {
        setStocksDataHistory((prev) =>
          prev.map((stock) => ({
            ...stock,
            prices: response.data[stock.key],
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleEndGame = () => {
    setGameEnded(true);
  };
  const getBotAction = () => {
    if (botStocksData && stocksData) {
      const requestBody = {
        money: 5000.0,
        gameId: gameData.game.id,
        botId: botId,
        ownedStocks: formatStocksData(botStocksData),
        stockPrices: formatPricesData(stocksData),
        date: getNextDateFromNow(currentDate),
      };
      const serverUrl = "http://127.0.0.1:5000/predict";
      axios
        .post(serverUrl, requestBody)
        .then(
          (response) => {
            console.log("0Response:", response.data);

            const requestBody = {
              userId: botId,
              stockKey: response.data.key,
              numShares: response.data.amount,
              day: day,
              gameId: gameData.game.id,
            };
            // const botMove = handleBotRequest(
            //   response.data,
            //   day,
            //   botId,
            //   gameData.game.id
            // );
            // console.log(botMove);

            if ((response.data.action = "buy")) {
              axios
                .put(buyRoute, requestBody)
                .then((response) => {
                  console.log("1Response:", response.data);
                  setBotMoves((prev) => [...prev, response.data.userMove]);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else if ((response.data.action = "sell")) {
              axios
                .put(sellRoute, requestBody)
                .then((response) => {
                  console.log("2Response:", response.data);
                  setBotMoves((prev) => [...prev, response.data.userMove]);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          }

          //setBotMoves((prev) => [...prev, botMove]);
        )
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const progressBarWidth = (seconds / 300) * 100;
  return (
    <div className="whole-game-board-container">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="board-upper-section-container">
        {stocksDataHistory.map((stock) => {
          return (
            <StockHistory
              key={stock.key}
              img={stock.logo}
              company={stock.key}
              name={stock.name}
              prices={stock.prices}
            />
          );
        })}
      </div>
      <div className="board-lower-section-container">
        <div className="owned-stocks-block-container">
          <Stocks ownedstocks={ownedstocksData} stocksdata={stocksData} />
        </div>
        <div className="Market-stocks-block-container">
          <Market
            day={day}
            gameId={gameData.game.id}
            handleUserMoveMarket={handleUserMoveMarket}
          />
        </div>
        <div className="game-log-block-container">
          <PlayerCard
            userMoves={userMoves}
            ownedstocks={ownedstocksData}
            stocksdata={stocksData}
            user={user?.id}
          />
          <PlayerCard
            userMoves={botMoves}
            ownedstocks={botStocksData}
            stocksdata={stocksData}
            user={botId}
          />
        </div>
      </div>
      <button className="vote-finito-btn" onClick={handleEndGame}>
        Vote Finish
      </button>
      <div className="board-lower-section-timer-bar">
        <div
          style={{ width: `${progressBarWidth}%` }}
          className="progress-bar-actual"
        ></div>
      </div>
      {gameEnded ? <VictoryScreen /> : false}
    </div>
  );
}
export default GameBoard;
