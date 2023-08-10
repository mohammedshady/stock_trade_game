import React from "react";
import "./styles/stocks.css";
import StockChange from "./StockChange.js";

{
  /* I hope this would work */
}
const Stocks = ({ ownedstocks, stocksdata }) => {
  return (
    <div className="stocks-container">
      <div className="Owned">Owned</div>
      {console.log(stocksdata)}
      {ownedstocks.map((stock, index) => {
        // Find the stock data from stocksdata array based on the stock key
        const stockData = stocksdata[stock.key];

        if (!stockData) {
          // Handle the case when stock data is not found
          return null;
        }
        return (
          <div className="main-container" key={index}>
            <div className="stock-row">
              <div>
                <p className="stock-key">{stock.key}</p>
                {/* name is to be added when I figure out where is it written*/}
                <p className="owned-stock-name">name</p>
              </div>
              <StockChange percentage={stockData.differenceBetweenDayBefore} />
              <p className="owned-stock-price">${stockData.price}</p>
              <div className="amount-owned">
                <div className="word-container">
                  <span className="word">Amount</span>
                  <span className="word">Owned</span>
                </div>
                <p className="stock-amount">
                  {stockData.price * stock.num_shares
                    ? parseFloat(
                        (stockData.price * stock.num_shares).toFixed(2)
                      )
                    : null}
                </p>
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
