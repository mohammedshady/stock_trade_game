import React, { useState } from "react";
import "./HomePage.css";
import wolf from "./wolf.jpg";
import axios from "axios";

function HomePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const postUserToServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/users",
        { name }
      );
      console.log("Username posted successfully!");
      //save the user id in local storage and keep his data throughout all components
      //redirect to the game settings page
    } catch (error) {
      console.error("Error while posting username:", error.message);
      setError("error while posting username.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("please enter a name");
      return;
    }
    postUserToServer();
  };
  const handleNameChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  return (
    <form className="App-header" onSubmit={handleSubmit}>
      <div className="page">
        <div className="title">
          <text>The bugs of wall street</text>
        </div>
        <div className="container">
          <div className="left">
            <div className="login">
              <img src={wolf} />
              <text>
                By logging in you agree to the ridiculously long terms that you
                didn't bother to read
              </text>
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
              {error ? <p className="name-error">{error}</p> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        <button className="button" type="submit">
          START GAME
        </button>
      </div>
    </form>
  );
}

export default HomePage;
