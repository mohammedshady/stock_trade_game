import React from "react";
import "./styles/GameBoard.css"
import Market from "./GameComponents/Market";
import Stocks from "./GameComponents/stocks";
import Temp from "../../temp";
import GameLog from "./GameComponents/GameLog";

function GameBoard() {
  return(
  <>
    <div className="board-upper-section-container">
    </div> 
    <div className="board-lower-section-container">
      {/* <div className="owned-stocks-block-container"><Temp/></div> */}
      <div className="Market-stocks-block-container"><Market/></div>
      {/* <div className="game-log-block-container"><GameLog/></div> */}
    </div> 
    </>
    )
  
  
}
export default GameBoard;
