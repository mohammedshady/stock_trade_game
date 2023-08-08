import React from "react";
import { useState, useEffect } from "react";
import MarketItem from "./MarketItem";
import axios from "axios";
import "./styles/Market.css";

function Market({ day, gameId, handleUserMoveMarket }) {
  const handleUserMove = (move) => {
    handleUserMoveMarket(move);
  };

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

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/game/stocks", { day: day })
      .then((response) => {
        setStocks((prev) =>
          prev.map((stock) => ({
            ...stock,
            price: response.data[stock.abbreviation].price,
            priceChange:
              response.data[stock.abbreviation].differenceBetweenDayBefore,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let borderStyle = true;
  return (
    <>
      <ul className="stocks-list marketStyle">
        {stocks.map((stock, index) => {
          borderStyle = index === stocks.length - 1 ? false : true;
          return (
            <MarketItem
              onUserMove={handleUserMove}
              gameId={gameId}
              day={day}
              key={index}
              stockImage={stock.url}
              stockAbbreviation={stock.abbreviation}
              stockName={stock.name}
              stockPriceChange={stock.priceChange}
              stockPrice={stock.price}
              priceChangeColor={stock.priceChange}
              borderStyle={borderStyle}
            />
          );
        })}
      </ul>
    </>
  );
}

export default Market;
