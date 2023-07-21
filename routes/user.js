const router = require("express").Router();
//const { v4: uuidv4 } = require('uuid');
//const { customAlphabet } = require('nanoid'); //package for unique ID generation
//const generateNumericID = customAlphabet('1234567890', 4); //ID's are of length 4 digits
// test 
// test 2 

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserStocksById,
  getStockPriceFromAllStocks,
  updateUserInfo,
} = require("../db");

const stockKeyMap = {
  MSFT: "Stock_Data_MSFT",
  IBM: "Stock_Data_IBM",
  TSLA: "Stock_Data_TSLA",
  META: "Stock_Data_META",
  AAPL: "Stock_Data_JPM",
};

////////////////////////////////////////////////////////
//                                                    //
//                    GETTERS                         //
//                                                    //
////////////////////////////////////////////////////////

//returning list of users
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(201).json({ message: "Fetched users List", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

//getting a certain player based on the ID (unique identifier)
router.get("/users/:id", async (req, res) => {
  // Extract the player ID from the request parameter
  const { id } = req.params; // -> destructure id from params
  // Find the player with the corresponding ID in the users array
  const player = await getUserById(id.toString());
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

//get stocks of a certain player (based on ID)
router.get("/users/player/:id/stocks", async (req, res) => {
  // Extract the player ID from the request parameter
  const { id } = req.params; // -> destructure id from params
  // Find the player with the corresponding ID in the users array
  const stocks = await getUserStocksById(id.toString());
  if (stocks) {
    res.status(200).json(stocks);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

////////////////////////////////////////////////////////
//                                                    //
//                      POSTERS                       //
//                                                    //
////////////////////////////////////////////////////////

//adding a new player
router.post("/users", async (req, res) => {
  try {
    const player = {
      id: req.body.id,
      name: req.body.name,
      money: 5000,
      stocks: [
        { key: "MSFT", num_shares: 0 },
        { key: "IBM", num_shares: 0 },
        { key: "TSLA", num_shares: 0 },
        { key: "META", num_shares: 0 },
        { key: "AAPL", num_shares: 0 },
      ],
    };
    // Save the new user to the database (using the createUser function)
    const user = await createUser(player);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle any errors that occurred during user creation
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

////////////////////////////////////////////////////////
//                                                    //
//                      PUTTERS                       //
//                                                    //
////////////////////////////////////////////////////////

// PUT route for SELLING a stock
router.put("/users/sell-stock", async (req, res) => {
  const { userId, stockKey, numShares, day } = req.body;
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
  const stockPrice = await getStockPriceFromAllStocks(
    stockKeyMap[stockKey],
    day
  );
  const amountToBeAdded = stockPrice * numShares;
  // Update the user's money and num_shares of the stock
  player.money += parseFloat(amountToBeAdded);
  stockToSell.num_shares -= parseInt(numShares);
  // Send a success response
  const updatedInfo = await updateUserInfo(userId, player);
  res.json({ message: "Stock sold successfully", updatedInfo });
});

// PUT route for BUYING a stock
router.put("/users/buy-stock", async (req, res) => {
  const { userId, stockKey, numShares, day } = req.body;
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
  const stockPrice = await getStockPriceFromAllStocks(
    stockKeyMap[stockKey],
    day
  );

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
  res.json({ message: "Stock bought successfully", updatedInfo });
});

module.exports = router;
