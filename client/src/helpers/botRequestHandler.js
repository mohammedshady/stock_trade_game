import axios from "axios";

const buyRoute = "http://localhost:3000/api/game/buy-stock";
const sellRoute = "http://localhost:3000/api/game/sell-stock";

export default function handleBotRequest(request, day, botId, gameId) {
  console.log(botId);
  const requestBody = {
    userId: botId,
    stockKey: request.key,
    numShares: request.amount,
    day: day,
    gameId: gameId,
  };
  if ((request.action = "buy")) {
    axios
      .put(buyRoute, requestBody)
      .then((response) => {
        console.log("Response:", response.data);
        return response.data.userMove;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if ((request.action = "sell")) {
    axios
      .put(sellRoute, requestBody)
      .then((response) => {
        console.log("Response:", response.data);
        return response.data.userMove;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
