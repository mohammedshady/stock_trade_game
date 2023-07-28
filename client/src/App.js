import Stocks from './stocks.js';
import './stocks.css'; // Import the CSS file for styling
import React, { useEffect, useState } from 'react';
import "./App.css";
import axios from "axios";

//components communication
/*
// var id = getLocalStorage.getItem("id");

// if( id === null) {

  create user

  setLocalSotage.setItem("id", user.id);

}
*/

/*let stocks = [
  {"key":"MSFT", "price":5, "num_shares":10},
  {"key":"IBM", "price":7, "num_shares":20}
]*/


function App() {
  const [stocksData, setStocksData] = useState([]);
  //_________________test request________________________
   useEffect(() => {
    axios
       .get("http://localhost:3000/api/user/users/player/8424/stocks")
       .then((response) => {
         setStocksData(response.data);
       })
       .catch((error) => {
         console.error(error);
       });
   }, []);

  // console.log(posts);
  //-------------------------------------------------------

  //added by Amira
  //const [stocksData, setStocksData] = useState([]);
  //useEffect(() => {
    // how to get player ID automatically ? (passed from first tab - props)
    //const playerId = "6b78110a-ffa7-4583-b36c-7070d19a4d74"; //why never read ?
    // Fetch the stocks data from the API 
    //fetch("http://localhost:7000/api/user/users/player/${playerId}/stocks")
      //.then((response) => response.json())
      //.then((data) => setStocksData(data));
  //}, []);
  
  return <div className="App">
    <Stocks stocks={stocksData}/>
  </div>;
  
}

export default App;
