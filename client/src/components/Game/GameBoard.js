import React, { useEffect, useState } from "react";
import "./styles/GameBoard.css"
import Market from "./GameComponents/Market";
import Stocks from "./GameComponents/stocks";
import StockHistory from "./GameComponents/StockHistory";
import PlayerCard from "./GameComponents/PlayerCard";
import axios from "axios";

import ibmLogo from "../../imgs/ibmImg.png"
import msftLogo from'../../imgs/msftImg.png'
import metaLogo from'../../imgs/metaImg.png'
import jpmLogo from'../../imgs/jpmImg.png'
import tslaLogo from'../../imgs/teslaImg.png'



function GameBoard() {
  const stocksHistory = [
    {
      key:"MSFT",
      name:"Microsoft Corp",
      logo:msftLogo,
      prices:[],
    },
    {
      key: "IBM",
      name:"International Business Machines Corp",
      logo:ibmLogo,
      prices:[],
    },
    {
      key: "META",
      name:"Meta Platforms, Inc.",
      logo:metaLogo,
      prices:[],
    },
    {
      key: "AAPL",
      name:"JPMorgan Chase & Co.",
      logo:jpmLogo,
      prices:[],
    },
    {
      key:"TSLA",
      name: "Tesla, Inc",
      logo:tslaLogo,
      prices:[],
    },
  ]
  const [stocksDataHistory,setStocksDataHistory]=useState(stocksHistory);
  const [ownedstocksData, setownedStocksData] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  // const playerID = ??
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/users/player/8424/stocks")
      .then((response) => {
        setownedStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const day = 1;

  useEffect(() => {
    const requestBody = {
      day: day,
    };
    axios
      .post("http://localhost:3000/api/game/stocks", requestBody)
      .then((response) => {
        setStocksData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [day]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/game/stocks-history/30")
      .then((response) => {
        console.log(response.data)

        setStocksDataHistory((prev)=>
          prev.map((stock)=>({
            ...stock,
            prices:response.data[stock.key]
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(stocksDataHistory);
  
  return(
  <div className="whole-game-board-container">
    <div className="board-upper-section-container">{
      stocksDataHistory.map((stock)=>{
  return(
    <StockHistory key={stock.key} img={stock.logo} company={stock.key} name={stock.name} prices={stock.prices}/>
  )
    })
    }
    </div> 
    <div className="board-lower-section-container">
      <div className="owned-stocks-block-container"><Stocks ownedstocks={ownedstocksData} stocksdata={stocksData}/></div>
      <div className="Market-stocks-block-container"><Market/></div>
      <div className="game-log-block-container">
        <PlayerCard/>
        <PlayerCard/>
        </div>
    </div> 
    <button className="vote-finito-btn">Vote Finish</button>
    <div className="board-lower-section-timer-bar"></div>
    </div>
    )
  
  
}
export default GameBoard;
