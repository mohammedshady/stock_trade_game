import React, { useEffect, useState } from "react";
import './styles/PlayerCard.css'
function PlayerCard() {
  useEffect(() => {
    //request game info from db
  }, []);

  return (
    <div className="game-homepage-playerCard">
      <div className="player-card-logo-title"></div>
      <div className="player-card-info-desc"></div>
      
    </div>
  );
}

export default PlayerCard;
