import React, { useEffect, useState } from "react";
import "./styles/PlayerCard.css";
import axios from "axios";
import playerLogo from "../../../imgs/playerImg.png";

function PlayerCard({ ownedstocks, stocksdata, user, move }) {
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
  }, []);

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
        <p>
          Profit = <span>{}</span>
        </p>
      </div>
    </div>
  );
}

export default PlayerCard;
