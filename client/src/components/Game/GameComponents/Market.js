import React from "react";
import { useState } from "react";
import MarketItem from "./MarketItem";
//import data from "../json/stocks.json";
import "./styles/Market.css";

function Market() {
  const initialStocks = [
    {
      url: "https://pbs.twimg.com/profile_images/1677090954350583811/Xy93qVY4_400x400.jpg",
      abbreviation: "IBM",
      name: "International Business Machines Corp",
      priceChange: "N/A",
      price: "$N/A",
    },
    {
      url: "https://pbs.twimg.com/profile_images/1268196215587397634/sgD5ZWuO_400x400.png",
      abbreviation: "MSFT",
      name: "Microsoft Corp",
      priceChange: "N/A",
      price: "$N/A",
    },
    {
      url: "https://pbs.twimg.com/profile_images/1605200105799401474/9cb5qdVk_400x400.png",
      abbreviation: "JPM",
      name: "JPMorgan Chase & Co.",
      priceChange: "N/A",
      price: "$N/A",
    },
    {
      url: "https://pbs.twimg.com/profile_images/1337607516008501250/6Ggc4S5n_400x400.png",
      abbreviation: "TSLA",
      name: "Tesla, Inc.",
      priceChange: "N/A",
      price: "$N/A",
    },
    {
      url: "https://pbs.twimg.com/profile_images/1457839751688593414/ABFhsHo0_400x400.jpg",
      abbreviation: "META",
      name: "Meta Platforms, Inc.",
      priceChange: "N/A",
      price: "$N/A",
    },
  ];
  const [stocks, setStocks] = useState(initialStocks);

//   function refreshStocksEachDay(day) {
//     for (let i = 0; i < initialStocks.length; i++) {
//       let currentStockData = data["Stock_Data_" + stocks[i].abbreviation];
//       let currentStockPrice = currentStockData[day].price;
//       console.log(currentStockData);
//       let currentPriceChange = currentStockData[day].differenceBetweenDayBefore;

//       setStocks((previousStocks) =>
//         previousStocks.map((stock, index) => {
//           if (index === i) {
//             return {
//               ...stock,
//               price: "$" + currentStockPrice,
//               priceChange: currentPriceChange,
//             };
//           } else {
//             return stock;
//           }
//         })
//       );
//     }
//   }

  function buttonHandlerRefresh() {
    //refreshStocksEachDay(5);
  }
  let borderStyle = true;
  return (
    <>
      <h2 className="marketLabelStyle">Market</h2>
      <ul className="stocks-list marketStyle">
        {stocks.map((stock,index) => {
          borderStyle =  (index === stocks.length -1) ? false : true;
            return( <MarketItem
                stockImage={stock.url}
                stockAbbreviation={stock.abbreviation}
                stockName={stock.name}
                stockPriceChange={stock.priceChange}
                stockPrice={stock.price}
                priceChangeColor={stock.priceChange}
                borderStyle = {borderStyle}
              />)
         
        })}
      </ul>
      <button onClick={buttonHandlerRefresh}>Refresh Stocks</button>
    </>
  );
}

export default Market;
