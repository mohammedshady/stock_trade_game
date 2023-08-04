import React, { useEffect, useState } from "react";
import './styles/PlayerCard.css'
import playerLogo from'../../../imgs/playerImg.png'
function PlayerCard() {
  useEffect(() => {
    //request game info from db
  }, []);

  return (
    <div className="game-homepage-playerCard">
      <div className="player-card-logo-title">
      <img className="player-card-img" src={playerLogo}/>
      <p className="player-card-title-name">Player 1</p>
      </div>
      <div className="player-card-info-desc">
        
        <p>Money = <span>Hello</span></p>
        <p>S Value = <span>Hello</span></p>
        <p>Profit = <span>Hello</span></p>
      </div>
      
    </div>
  );
}

export default PlayerCard;
