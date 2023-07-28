import Stocks from "./stocks.js";
import "./stocks.css"; // Import the CSS file for styling
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

//amira
//components communication
/*
// var id = getLocalStorage.getItem("id");

// if( id === null) {

  create user

  setLocalSotage.setItem("id", user.id);

}
*/

function App() {
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
  console.clear();
  console.log(stocksData);

  return (
    <div className="App">
      <Stocks ownedstocks={ownedstocksData} />
    </div>
  );
}

export default App;
