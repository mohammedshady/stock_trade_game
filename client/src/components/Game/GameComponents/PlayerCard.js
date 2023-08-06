import React, { useEffect, useState } from "react";
import "./styles/PlayerCard.css";
import axios from "axios";
import playerLogo from "../../../imgs/playerImg.png";

function PlayerCard({ ownedstocks, stocksdata, user, userMoves }) {
  const [totalStocksPrice, setTotalStocksPrice] = useState(0);
  const [userData, setUserData] = useState({});
  let total = 0;
  useEffect(() => {
    ownedstocks?.forEach((stock) => {
      total = total + stock.num_shares * stocksdata[stock.key]?.price;
    });
    setTotalStocksPrice(total);
    axios
      .get(`http://localhost:3000/api/user/users/${user}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userMoves]);

  console.log(userMoves[userMoves.length - 1]);
  // const userLastMove = userMoves?.pop();
  // console.log(userLastMove?.changeValue);

  const recentMoveProfit = userMoves[userMoves.length - 1]?.changeValue;
  const sumOfProfit = userMoves.reduce((accumulator, move) => {
    return accumulator + move.changeValue;
  }, 0);
  return (
    <div className="game-homepage-playerCard">
      <div className="player-card-logo-title">
        <img className="player-card-img" src={playerLogo} />
        <p className="player-card-title-name">{userData.name}</p>
      </div>
      <div className="player-card-info-desc">
        <p>
          Money = <span>$ {userData.money}</span>
        </p>
        <p>
          S Value = <span>$ {totalStocksPrice}</span>
        </p>

        <div className="player-profit-container">
          <div>profit = </div>
          <div className="player-profit-value-container">
            <div className="player-profit-total-value"> {sumOfProfit}</div>
            <div
              className="player-profit-value"
              style={
                recentMoveProfit > 0 ? { color: "green" } : { color: "red" }
              }
            >
              {recentMoveProfit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
