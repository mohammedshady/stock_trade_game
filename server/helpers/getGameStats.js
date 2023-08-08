function getGameStats(userGameLogs) {
  let winnerId = null;
  let loserId = null;
  let highestProfit = -Infinity;
  let lowestProfit = Infinity;

  for (const playerId in userGameLogs) {
    const playerData = userGameLogs[playerId];
    const profit = playerData.totalProfit;

    if (profit > highestProfit) {
      highestProfit = profit;
      winnerId = playerId;
    }

    if (profit < lowestProfit) {
      lowestProfit = profit;
      loserId = playerId;
    }
  }
  const gameInfo = {
    winner: {
      id: winnerId,
      logs: userGameLogs[winnerId],
    },
    loser: {
      id: loserId,
      logs: userGameLogs[loserId],
    },
  };
  return gameInfo;
}

function formatPricesData(prices) {
  let pricesData = {};
  for (const key in prices) {
    pricesData[key] = parseFloat(prices[key].price);
  }
  return pricesData;
}
function formatStocksData(stocks) {
  const stocksData = {};
  stocks.forEach((stock) => {
    const symbol = stock.key.toLowerCase();
    const numShares = stock.num_shares;
    stocksData[symbol] = numShares;
  });
  
  return stocksData
}
module.exports = { getGameStats,formatStocksData,formatPricesData };
