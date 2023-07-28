import React from "react";
import StockChange from "./StockChange.js";

/* {stockbyday.key.differenceBetweenDayBefore}  */
const Stocks = ({ ownedstocks }) => {
  return (
    <div className="stocks-container">
      <div className="Owned">Owned</div>
      {ownedstocks.map((stock, index) => (
        <div className="main" key={index}>
          <div className="stock-row">
            <div>
              <p className="stock-key">{stock.key}</p>
              <p className="stock-name">name</p>
            </div>
            <StockChange percentage={9.44} />
            <p className="stock-price">$price</p>
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
      ))}
    </div>
  );
};

export default Stocks;
