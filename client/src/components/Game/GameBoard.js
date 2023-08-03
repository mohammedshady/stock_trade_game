import React from "react";
import "./styles/GameBoard.css"
import Market from "./GameComponents/Market";
import Stocks from "./GameComponents/stocks";
import Temp from "../../temp";
import GameLog from "./GameComponents/GameLog";
import StockHistory from "./GameComponents/StockHistory";

const stocksLogos = [
  {MSFT:"../../../public/imgs/msftImg.png"},
  {META:"../../../public/imgs/metaImg.png"},
  {JPM:"../../../public/imgs/jpmImg.png"},
  {TSLA:"../../../public/imgs/tslaImg.png"},
  {IBM:"../../../public/imgs/ibmImg.png"},
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
      {/* <div className="game-log-block-container"><GameLog/></div> */}
    </div> 
    </>
    )
  
  
}
export default GameBoard;
