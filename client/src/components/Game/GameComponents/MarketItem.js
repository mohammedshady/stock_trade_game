import React from "react";
import "./styles/MarketItem.css";

function sellButtonHandler() {
  let stocksAmount;
  console.log("Sold");
}

function MarketItem(props) {
  // const priceChangeStyle = {
  //   color: props.priceChangeColor.startsWith("-") ? "red" : "green",
  //};


  //style={priceChangeStyle}
  return (
    <li className={`stock-item ${props.borderStyle ? "":"no-border-item"}`}>
      <img
        className="stock-image"
        src={props.stockImage}
        alt="Picture of stock"
      />

      <div className="stock-name-and-abbreviation">
        <h3 className="stock-abbreviation">{props.stockAbbreviation}</h3>
        <h6 className="stock-name">{props.stockName}</h6>
      </div>

      <h5 className="stock-price-change" >
        {props.stockPriceChange}
      </h5>
      <h3 className="stock-price">{props.stockPrice}</h3>

      <div className="stock-amount-container">
        <h4 className="stock-amount-label">Amount</h4>
        <input type="text" className="stock-amount-input" />
      </div>

      <div className="market-buttons-container">
      <button className="stock-buy-and-sell-button">Buy</button>
      <button className="stock-buy-and-sell-button" onClick={sellButtonHandler}>
        Sell
      </button>
      </div>
    </li>
  );
}

export default MarketItem;
