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
import handleBotRequest from "../../helpers/botRequestHandler";

const {
  formatStocksData,
  formatPricesData,
} = require("../../helpers/dataFormater");

function GameBoard() {
  const location = useLocation();
  const gameData = location.state && location.state.gameData;

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
      key: "AAPL",
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
  const [day, setDay] = useState(1);

  console.log(botMoves);
  const botId = "f6149180-4c4b-4abc-bbc3-45d99e36a9e4";
  const flaskUrl = "http://127.0.0.1:5000";

  const handleUserMoveMarket = (move) => {
    setUserMoves((prev) => [...prev, move]);
  };
  if (!user.id) {
    console.log("cannot find user Login Again");
  }

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

    //prob here
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/game/stocks", { day })
      .then((response) => {
        setStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [day]);

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
      .get("http://localhost:3000/api/game/stocks-history/30")
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
  const getBotAction = () => {
    if (botStocksData && stocksData) {
      const requestBody = {
        money: 5000.0,
        gameId: gameData.game.id,
        botId: botId,
        ownedStocks: formatStocksData(botStocksData),
        stockPrices: formatPricesData(stocksData),
        date: "2022-07-01",
      };
      const serverUrl = "http://127.0.0.1:5000/predict";
      axios
        .post(serverUrl, requestBody)
        .then((response) => {
          console.log("Response:", response.data);

          const botMove = handleBotRequest(
            response.data,
            day,
            botId,
            gameData.game.id
          );
          setBotMoves((prev) => [...prev, botMove]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="whole-game-board-container">
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
          {/* <PlayerCard
            userMoves={botMoves}
            ownedstocks={botStocksData}
            stocksdata={stocksData}
            user={botId}
          /> */}
        </div>
      </div>
      <button className="vote-finito-btn" onClick={getBotAction}>
        Vote Finish
      </button>
      <div className="board-lower-section-timer-bar"></div>
    </div>
  );
}
export default GameBoard;
