const router = require("express").Router();

const {
  createGame,
  getStockPriceFromStock,
  updateUserInfo,
  getGame,
  getUserById,
  getStocksData,
  updateGameInfo,
  getMoneyFromUserStocks,
} = require("../db");

const stockKeyMap = {
  MSFT: "Stock_Data_MSFT",
  IBM: "Stock_Data_IBM",
  TSLA: "Stock_Data_TSLA",
  META: "Stock_Data_META",
  AAPL: "Stock_Data_JPM",
};

//generating a game
router.post("/game", async (req, res) => {
  try {
    const gameData = req.body;
    const newGameSession = {
      id: gameData.id,
      settings: {},
      players: gameData.players, // Players participating in the game
      status: "starting", // Status of the game session
    };

    const game = await createGame(newGameSession);
    currentGameCode = game.gameId;
    res.status(201).json({ message: "Game Created !", game });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new game session." });
  }
});

// PUT route for SELLING a stock
router.put("/sell-stock", async (req, res) => {
  const { userId, stockKey, numShares, day, gameId } = req.body;
  // Find the user based on the provided userId
  const player = await getUserById(userId.toString());
  // player not found
  if (!player) {
    return res.status(404).json({ error: "User not found" });
  }
  // Find the stock in the user's stocks array based on the provided stockKey
  const stockToSell = player.stocks.find((stock) => stock.key === stockKey);
  // extra validation but not necessary as the player has a relation with all stocks
  if (!stockToSell) {
    return res.status(404).json({ error: "Stock not found for this user" });
  }
  // Check if the user has enough shares to sell
  if (numShares > stockToSell.num_shares) {
    return res.status(400).json({ error: "Insufficient shares to sell" });
  }

  // Calculate the amount to be added to the user's money and the new number of shares
  // Assuming you have a function to get the stock price from your AllStocks database
  const { price: stockPrice, differenceBetweenDayBefore: priceChange } =
    await getStockPriceFromStock(stockKeyMap[stockKey], day);
  const amountToBeAdded = stockPrice * numShares;
  // Update the user's money and num_shares of the stock
  player.money += parseFloat(amountToBeAdded);
  stockToSell.num_shares -= parseInt(numShares);
  // Send a success response
  const updatedInfo = await updateUserInfo(userId, player);
  if (!updatedInfo) {
    return res.status(404).json({ error: "error updating player info" });
  }

  const userMove = {
    action: "sell",
    stockKey: stockKey,
    numShares: numShares,
    changeValue: amountToBeAdded,
  };

  const game = await getGame(gameId);
  game.players[userId].moves.push(userMove);

  const updatedGame = await updateGameInfo(gameId, game);

  res.json({ message: "Stock sold successfully", updatedInfo, updatedGame });
});

// PUT route for BUYING a stock
router.put("/buy-stock", async (req, res) => {
  const { userId, stockKey, numShares, day, gameId } = req.body;
  // Find the user based on the provided userId
  const player = await getUserById(userId.toString());
  // player not found
  if (!player) {
    return res.status(404).json({ error: "User not found" });
  }
  // Find the stock in the user's stocks array based on the provided stockKey
  const stockToSell = player.stocks.find((stock) => stock.key === stockKey);
  // extra validation but not necessary as the player has a relation with all stocks
  if (!stockToSell) {
    return res.status(404).json({ error: "Stock not found for this user" });
  }
  // Calculate the amount to be deducted from the user's money and the new number of shares
  // Assuming you have a function to get the stock price from your AllStocks database
  const { price: stockPrice, differenceBetweenDayBefore: priceChange } =
    await getStockPriceFromStock(stockKeyMap[stockKey], day);

  const amountToBeDeducted = stockPrice * numShares;
  // Check if the user has enough money to buy
  if (amountToBeDeducted > player.money) {
    return res
      .status(400)
      .json({ error: "Insufficient money to buy" })
      .json({ message: "your money amount is: " }, player.money);
  }
  // Update the user's money and num_shares of the stock
  player.money -= parseFloat(amountToBeDeducted);
  stockToSell.num_shares += parseInt(numShares);
  // Send a success response

  const updatedInfo = await updateUserInfo(userId, player);
  if (!updatedInfo) {
    return res.status(404).json({ error: "error updating player info" });
  }

  const userMove = {
    action: "buy",
    stockKey: stockKey,
    numShares: numShares,
    changeValue: -amountToBeDeducted,
  };

  const game = await getGame(gameId);
  game.players[userId].moves.push(userMove);

  const updatedGame = await updateGameInfo(gameId, game);

  res.json({ message: "Stock bought successfully", updatedInfo, updatedGame });
});

module.exports = router;

//load game stocks
router.get("/stocks", async (req, res) => {
  try {
    const { day } = req.body;
    const stocksData = await getStocksData(day);

    if (!stocksData) {
      res.status(404).json({ error: "stocks data not found" });
    }

    res.status(200).json(stocksData);
  } catch (error) {
    console.error("Error loading stocks data:", error);
    res.status(500).json({ error: "Failed to load stocks data for game." });
  }
});

//WORKING ON ____________________________________________________________________________

// end game
router.put("/game/end", async (req, res) => {
  try {
    const { gameId, id, day } = req.body;
    const game = await getGame(gameId);
    if (!game) {
      res.status(404).json({ error: "game not found" });
    }

    // Object to store total profit for each player
    const usersProfit = {};
    // Calculate total profit for each player
    for (const [playerId, playerData] of Object.entries(game.players)) {
      const stocks = await getMoneyFromUserStocks(playerId);

      // calculate user current stocks price
      let totalPrice = 0;
      for (const stock of Object.values(stocks)) {
        const priceOfStock = await getStockPriceFromStock(
          stockKeyMap[stock.key],
          day
        );
        const priceOfShares = priceOfStock.price * stock.num_shares;
        totalPrice += priceOfShares;
      }

      let totalProfit = 0;
      for (const move of playerData.moves) {
        totalProfit += move.changeValue;
      }
      usersProfit[playerId] = {
        totalProfit: totalProfit + totalPrice,
        moves: playerData.moves,
      };
    }
    res.status(200).json(usersProfit);
  } catch (error) {
    console.error("couldnt end game", error);
    res.status(500).json({ error: "Failed to End Game." });
  }
});

module.exports = router;
