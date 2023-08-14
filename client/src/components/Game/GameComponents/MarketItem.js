import React, { useState } from "react";
import "./styles/MarketItem.css";
import axios from "axios";
import { useUser } from "../../context/SetUser";

function buyButtonHandler(
  id,
  stockAbbreviation,
  day,
  amount,
  gameId,
  onUserMove
) {
  try {
    axios
      .put(`http://localhost:3000/api/game/buy-stock`, {
        userId: id,
        stockKey: stockAbbreviation,
        numShares: amount,
        day: day,
        gameId: gameId,
      })
      .then((response) => {
        console.log(response.data);
        onUserMove(response.data.userMove);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function sellButtonHandler(
  id,
  stockAbbreviation,
  day,
  amount,
  gameId,
  onUserMove
) {
  try {
    axios
      .put(`http://localhost:3000/api/game/sell-stock`, {
        userId: id,
        stockKey: stockAbbreviation,
        numShares: amount,
        day: day,
        gameId: gameId,
      })
      .then((response) => {
        console.log(response.data);
        onUserMove(response.data.userMove);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function MarketItem(props) {
  const [amount, setAmount] = useState(1);
  const { user } = useUser();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // const priceChangeStyle = {
  //   color: props.priceChangeColor.startsWith("-") ? "red" : "green",
  //};

  //style={priceChangeStyle}

  const priceChangeValue = props.stockPriceChange.slice(
    0,
    props.stockPriceChange.length - 1
  );

  return (
    <li className={`stock-item ${props.borderStyle ? "" : "no-border-item"}`}>
      <img
        className="stock-image"
        src={props.stockImage}
        alt="Picture of stock"
      />

      <div className="stock-name-and-abbreviation">
        <h3 className="stock-abbreviation">{props.stockAbbreviation}</h3>
        <h6 className="stock-name">{props.stockName}</h6>
      </div>

      <h5
        className="stock-price-change"
        style={priceChangeValue > 0 ? { color: "green" } : { color: "red" }}
      >
        {priceChangeValue > 0
          ? `+${priceChangeValue}%`
          : `${priceChangeValue}%`}
      </h5>
      <h3 className="stock-price">{props.stockPrice}</h3>

      <div className="stock-amount-container">
        <h4 className="stock-amount-label">Amount</h4>
        <input
          type="text"
          className="stock-amount-input"
          onChange={handleAmountChange}
        />
      </div>

      <div className="market-buttons-container">
        <button
          className="stock-buy-and-sell-button"
          onClick={() => {
            buyButtonHandler(
              user.id,
              props.stockAbbreviation,
              props.day,
              amount,
              props.gameId,
              props.onUserMove
            );
          }}
        >
          Buy
        </button>
        <button
          className="stock-buy-and-sell-button"
          onClick={() => {
            sellButtonHandler(
              user.id,
              props.stockAbbreviation,
              props.day,
              amount,
              props.gameId,
              props.onUserMove
            );
          }}
        >
          Sell{" "}
        </button>
      </div>
    </li>
  );
}

export default MarketItem;
