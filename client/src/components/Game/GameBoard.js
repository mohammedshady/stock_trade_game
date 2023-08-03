import React from "react";
import "./styles/GameBoard.css"
import Market from "./GameComponents/Market";
import Stocks from "./GameComponents/stocks";
import Temp from "../../temp";
import GameLog from "./GameComponents/GameLog";
import StockHistory from "./GameComponents/StockHistory";
import PlayerCard from "./GameComponents/PlayerCard";
const stocksLogos = [
  {MSFT:"msftImg.png"},
  {META:"metaImg.png"},
  {JPM:"jpmImg.png"},
  {TSLA:"tslaImg.png"},
  {IBM:"ibmImg.png"},
]


const stocks = ["MSFT","IBM","META","JPM","TESLA"];




function GameBoard() {
  return(
  <>
    <div className="board-upper-section-container">{
      stocks.map((stock)=>{
  return(
    <StockHistory img={stocksLogos[stock]}/>
  )
    })
    }
      
    
    </div> 
    <div className="board-lower-section-container">
      <div className="owned-stocks-block-container"><Temp/></div>
      <div className="Market-stocks-block-container"><Market/></div>
      <div className="game-log-block-container"><PlayerCard/></div>
    </div> 
    </>
    )
  
  
}
export default GameBoard;
