import Stocks from "./stocks.js";
import "./stocks.css"; // Import the CSS file for styling
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/startPage/HomePage";
import PreGame from "./components/Game/PreGame";
import GameBoard from "./components/Game/GameBoard";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="pre-game" element={<PreGame />} />
          <Route path="game" element={<GameBoard />} />
          {/* <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
