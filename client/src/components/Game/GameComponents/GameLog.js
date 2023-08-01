import React, { useEffect, useState, useRef } from "react";
import "./styles/GameLog.css";
function GameLog({ messages }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const scrollContainer = chatContainerRef.current;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  };

  return (
    <div className="game-homepage-gameLog">
      <div className="game-homepage-gameLog-title">Logs</div>
      <div className="game-homepage-gameLog-effect"></div>
      <div className="game-homepage-gameLog-msgs" ref={chatContainerRef}>
        {messages?.map((msg, index) => {
          return <div key={index}>{msg}</div>;
        })}
      </div>
    </div>
  );
}

export default GameLog;
