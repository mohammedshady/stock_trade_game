import React, { useEffect, useState } from "react";
import axios from "axios";
import Stocks from "./components/Game/GameComponents/stocks";

export default function Temp(){
    const [ownedstocksData, setownedStocksData] = useState([]);
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
  
    const [stocksData, setStocksData] = useState([]);
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

    return(
        <Stocks ownedstocks={ownedstocksData} stocksdata={stocksData} /> 
    )
}
