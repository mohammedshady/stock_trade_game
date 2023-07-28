import React from 'react';
import StockChange from './StockChange.js';

const Stocks = ({ stocks }) => {
  return (
    <div className="stocks-container">
      <div className="Owned">Owned</div>
      {stocks.map((stock, index) => (
        <>
          <div key={index} className="stock-row">
            <div>
              <p className="stock-key">{stock.key}</p>
              <p className="stock-name">name</p>
            </div>
            <StockChange percentage={9.44} />
            <p className="stock-price">$price</p>
            <div className="amount-owned">
              <div class="word-container">
                <span class="word">Amount</span>
                <span class="word">Owned</span>
              </div>
              <p className="stock-amount">{stock.price * stock.num_shares}</p>
            </div>
          </div>
          <p className="line"></p>
        </>
      ))}
    </div>
  );
};

export default Stocks;