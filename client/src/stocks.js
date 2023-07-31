import React from "react";
import StockChange from "./StockChange.js";

 {/* I hope this would work */}
const Stocks = ({ ownedstocks, stocksdata }) => {
  return (
    <div className="stocks-container">
      <div className="Owned">Owned</div>
      {ownedstocks.map((stock, index) => {
        // Find the stock data from stocksdata array based on the stock key
        const stockData = stocksdata.find((data) => data[stock.key]);

        if (!stockData) {
          // Handle the case when stock data is not found
          return null;
        }

        const { price, difference } = stockData[stock.key];

        return (
          <div className="main" key={index}>
            <div className="stock-row">
              <div>
                <p className="stock-key">{stock.key}</p>
                {/* name is to be added when I figure out where is it written*/}
                <p className="stock-name">name</p>
              </div>
              <StockChange percentage={difference} />
              <p className="stock-price">${price}</p>
              <div className="amount-owned">
                <div className="word-container">
                  <span className="word">Amount</span>
                  <span className="word">Owned</span>
                </div>
                <p className="stock-amount">{stock.price * stock.num_shares}</p>
              </div>
            </div>
            <p className="line"></p>
          </div>
        );
      })}
    </div>
  );
};

export default Stocks;
