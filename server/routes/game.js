const router = require("express").Router();
const { getGameStats } = require("../helpers/getGameStats");
const crypto = require("crypto");

const {
  createGame,
  getStockPrice,
  updateUserInfo,
  getGame,
  getUserById,
  getStocksData,
  getUserStocksById,
  updateGameInfo,
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
    const uniqueID = crypto.randomUUID();
    const newGameSession = {
      id: uniqueID,
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

//updating a game
router.put("/game/update", async (req, res) => {
  try {
    const { id, gameSettings } = req.body;
    const Updatedgame = await updateGameInfo(id, gameSettings);
    res.status(201).json({ message: "Game Updated !", Updatedgame });

  } catch (error) {
    res.status(500).json({ error: "Failed to update the game." });
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
    await getStockPrice(stockKeyMap[stockKey], day);
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
    await getStockPrice(stockKeyMap[stockKey], day);

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
router.post("/stocks", async (req, res) => {
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

// end game
router.put("/game/end", async (req, res) => {
  try {
    const { gameId, day } = req.body;
    const game = await getGame(gameId);
    if (!game) {
      res.status(404).json({ error: "game not found" });
    }
    // Object to store total profit for each player
    const userGameLogs = {};
    // Calculate total profit for each player
    for (const [playerId, playerData] of Object.entries(game.players)) {
      const stocks = await getUserStocksById(playerId);
      //check if user has stocks

      if (!stocks) {
        res.status(404).json({ error: "stocks for users not found" });
      }
      // calculate user current stocks price
      let ownedStocksPrice = 0;
      for (const stock of Object.values(stocks)) {
        const stockPrice = await getStockPrice(stockKeyMap[stock.key], day);
        ownedStocksPrice += stockPrice.price * stock.num_shares;
      }

      let totalProfit = 0;
      for (const move of playerData.moves) {
        totalProfit += move.changeValue;
      }
      userGameLogs[playerId] = {
        totalProfit: totalProfit + ownedStocksPrice,
        moves: playerData.moves,
      };
    }
    const gameInfo = getGameStats(userGameLogs);
    game.status = "ended";

    await updateGameInfo(gameId, game);

    res.status(200).json(gameInfo);
  } catch (error) {
    console.error("couldnt end game", error);
    res.status(500).json({ error: "Failed to End Game." });
  }
});

module.exports = router;
