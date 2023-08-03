import React, { useState } from "react";
import "./HomePage.css";
import wolf from "./wolf.jpg";
import stocksbackground from "./stocksbackground.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/SetUser";

function HomePage() {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [funFact, setFunFact] = useState("fun fact here.");

  const funFactsList = [
    "In 2005, an inexperienced trader at a Japanese bank tried to sell 1 share of J-Com stock for ¥640,000. He accidentally sold 640,000 shares for ¥1 each; the equivalent of selling $3 billion worth of shares for the price of $5,000.",
    "There is a ‘pirate stock exchange’ in Somalia where locals can invest in pirate gangs planning hijacking missions.",
    "Ronald Wayne was the third cofounder of Apple, along with Steve Wozniak and Steve Jobs. In 1976, he sold his 10% share of the company for $800. Today, his 10% would have been worth of $35 billion.",
    "The New York Stock Exchange is considered to be the most traditional as traders cannot enter the floor of the exchange if they are not wearing a suit and tie.",
    "Many people think that the stock market is something modern. Most people would say that it started about 100 years ago. But in fact, the stock market is ancient.",
    "In any given year, the stock market is more likely to go up than down.",
    "There is a myth surrounding October in the stock market. There is even an effect called The October Effect.",
    "We just saw that a lot of people believe in The October Effect. On the same idea, September is the worst month for the stock market.",
    "The world stock market is enormous, with 60 stock market exchanges! But the United States stock market is the biggest by far!",
  ];

  const postUserToServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/users",
        { name }
      );
      console.log("Username posted successfully!");
      //save the user id in local storage and keep his data throughout all components
      const { id, name: userName } = response.data.user;
      updateUser(id, userName);
    } catch (error) {
      console.error("Error while posting username:", error.message);
      setError("error while posting username.");
    }
  };

  const createGame = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/game/game");
      console.log("Username posted successfully!");

      //redirect to the game settings page
      return response.data;
    } catch (error) {
      console.error("Error while posting username:", error.message);
      setError("error while posting username.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Error! Please enter a name.");
      return;
    }
    try {
      await postUserToServer();
      const gameData = await createGame();
      navigate("/pre-game", { state: { gameData } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleFunFactChange = () => {
    const randomIndex = Math.floor(Math.random() * funFactsList.length);
    const newFunFact = funFactsList[randomIndex];
    setFunFact(newFunFact);
  };

  return (
    <form className="App-header" onSubmit={handleSubmit}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      />
      <div className="page">
        <div className="title">
          <text>The Bugs of Wall Street</text>
        </div>
        <div className="container">
          <div className="left">
            <div className="login">
              <img src={wolf} />
              <text>
                By logging in you agree to the ridiculously long terms that you
                didn't bother to read.
              </text>
              <h1 onClick={handleFunFactChange}>
                🎉Click here to change the fun facts!
              </h1>
              <text>{funFact}</text>
            </div>
          </div>
          <div className="right">
            <div className="form">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="email"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <button className="button" type="submit">
              START GAME
            </button>
            {error ? <p className="name-error">{error}</p> : null}
          </div>
        </div>
      </div>
      <div className="App"></div>
    </form>
  );
}

export default HomePage;
