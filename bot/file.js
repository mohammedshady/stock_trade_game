const axios = require("axios");

const botId = "f6149180-4c4b-4abc-bbc3-45d99e36a9e4";






async function getPredictions() {
  try {
    const response = await axios.post(`${flaskUrl}/predict`, {
      money: botData.money,
      gameId: "",
      botId: botData.id,
      ownedStocks:formatStocksData(owned_stocks),
      stockPrices: formatPricesData(stocks_prices),
      date: "",
    });
    const action = response.data;
    console.log("Predictions:", action);
    // Process the predictions as needed
  } catch (error) {
    console.error("Error fetching predictions:", error.message);
  }
}


