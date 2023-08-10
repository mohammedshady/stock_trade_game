import React, { useState } from "react";
import "./HomePage.css";
import wolf from "./wolf.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/SetUser";

function HomePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  console.log(userName);

  const postUserToServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/users",
        { name: userName }
      );
      const { id, userName: name } = response.data.user;
      updateUser(id, userName);
      console.log("Username posted successfully!");
      //save the user id in local storage and keep his data throughout all components
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
    try {
      if (!user.id) {
        if (userName.length === 0) {
          setError("please enter a name");
          return;
        }
        await postUserToServer();
      }
      await postUserToServer();
      const gameData = await createGame();
      navigate("/pre-game", { state: { gameData } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = (e) => {
    setError("");
    setUserName(e.target.value);
  };

  return (
    <form className="App-header" onSubmit={handleSubmit}>
      <div className="page">
        <div className="upperScreen">
          <div className="title">
            <text>The bugs of wall street</text>
          </div>

          <div className="container">
            <div className="left">
              <div className="login">
                <div className="login-image">
                  <img src={wolf} />
                </div>
                <br />
                <div className="login-text">
                  <text>
                    By logging in you agree to the ridiculously long terms that
                    you didn't bother to read
                  </text>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="form">
                <label htmlFor="name">Name:</label>
                {user?.name ? (
                  <p>
                    Logged in as : <span>{user.name}</span>
                  </p>
                ) : (
                  <input
                    value={userName}
                    type="text"
                    id="email"
                    onChange={handleNameChange}
                  />
                )}
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
      </div>
    </form>
  );
}

export default HomePage;
