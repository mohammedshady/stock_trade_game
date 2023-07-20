const router = require("express").Router();
//const { v4: uuidv4 } = require('uuid');
const { customAlphabet } = require('nanoid'); //package for unique ID generation
const generateNumericID = customAlphabet('1234567890', 4); //ID's are of length 4 digits



// stock object
// key (ex: MSFT) linked with database of stocks
// num_shares => number of shares a user posses of a certain stock

let users = []; 


////////////////////////////////////////////////////////
//                                                    //
//                    GETTERS                         //
//                                                    //
////////////////////////////////////////////////////////

//returning list of users
router.get("/users", (req,res) => 
    {
        res.json(users);
    }
);


//getting a certain player based on the ID (unique identifier)
router.get("/users/:id", (req, res) => 
{
  // Extract the player ID from the request parameter
  const id = parseInt(req.params.id);
  //const {id} = req.params; // -> destructure id from params
  // Find the player with the corresponding ID in the users array
  const player = users.find(user => user.id === id);
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});


//get stocks of a certain player (based on ID)
router.get("/users/player/:id/stocks", (req, res) => {
  // Extract the player ID from the request parameter
  const id = parseInt(req.params.id);
  //const {id} = req.params; // -> destructure id from params
  // Find the player with the corresponding ID in the users array
  const player = users.find(user => user.id === id);
  if (player) {
    res.status(200).json(player.stocks);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});


module.exports = router;


////////////////////////////////////////////////////////
//                                                    //
//                      POSTERS                       //
//                                                    //
////////////////////////////////////////////////////////

//adding a new player
router.post("/users", (req, res) => {
  const player = {
    id: generateNumericID(),
    name: req.body.name, 
    money: 5000, // fixed with a constant amount at start of game 
    //stocks array; initially user has 0 shares 
    stocks: [ {key:"MSFT", num_shares : 0},
              {key:"IBM" , num_shares : 0},
              {key:"TSLA", num_shares : 0},
              {key:"META", num_shares : 0},
              {key:"AAPL", num_shares : 0}],  
  };
  users.push(player);
  res.status(201).json({ message: 'User created successfully', users });
});


////////////////////////////////////////////////////////
//                                                    //
//                      PUTTERS                       //
//                                                    //
////////////////////////////////////////////////////////

// PUT route for SELLING a stock
router.put("/users/sell-stock", (req, res) => {
  const { userId, stockKey, numShares } = req.body;
  // Find the user based on the provided userId
  const player = users.find(user => user.id === userId);
  // player not found
  if (!player) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Find the stock in the user's stocks array based on the provided stockKey
  const stockToSell = player.stocks.find(stock => stock.key === stockKey);
  // extra validation but not necessary as the player has a relation with all stocks
  if (!stockToSell) {
    return res.status(404).json({ error: 'Stock not found for this user' });
  }
  // Check if the user has enough shares to sell
  if (numShares > stockToSell.num_shares) {
    return res.status(400).json({ error: 'Insufficient shares to sell' });
  }
  // Calculate the amount to be added to the user's money and the new number of shares
  // Assuming you have a function to get the stock price from your AllStocks database
  const stockPrice = getStockPriceFromAllStocks(stockKey); 
  const amountToBeAdded = stockPrice * numShares;
  // Update the user's money and num_shares of the stock
  player.money += amountToBeAdded;
  stockToSell.num_shares -= numShares;
  // Send a success response
  res.json({ message: 'Stock sold successfully', player });
});

// PUT route for BUYING a stock
router.put("/users/buy-stock", (req, res) => {
  const { userId, stockKey, numShares } = req.body;
  // Find the user based on the provided userId
  const player = users.find(user => user.id === userId);
  // player not found
  if (!player) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Find the stock in the user's stocks array based on the provided stockKey
  const stockToSell = player.stocks.find(stock => stock.key === stockKey);
  // extra validation but not necessary as the player has a relation with all stocks
  if (!stockToSell) {
    return res.status(404).json({ error: 'Stock not found for this user' });
  }
  // Calculate the amount to be deducted from the user's money and the new number of shares
  // Assuming you have a function to get the stock price from your AllStocks database
  const stockPrice = getStockPriceFromAllStocks(stockKey); 
  const amountToBeDeducted = stockPrice * numShares;
  // Check if the user has enough money to buy
  if (amountToBeDeducted > player.money) {
    return res.status(400).json({ error:'Insufficient money to buy'}).json({message:'your money amount is: '},player.money);
  }
  // Update the user's money and num_shares of the stock
  player.money -= amountToBeDeducted;
  stockToSell.num_shares += numShares;
  // Send a success response
  res.json({ message: 'Stock bought successfully', player });
});





////////////////////// TESTING FUNCTION //////////////////////////

// Example function to fetch the stock price from AllStocks database
// this is only used for testing purposes 
// to be removed later
function getStockPriceFromAllStocks(stockKey) {
  // Replace this with your logic to get the stock price from your database
  // For simplicity and testing, assume we have a fixed stock price for each stock
  const stockPrices = {
    MSFT:  150,
    AAPL:  200,
    TSLA:  800,
    IBM : 2500,
    META: 1000,
    // Add other stock prices as needed
  };

  return stockPrices[stockKey]; 
  // Return (??) if the stock key is not found (handle edge cases)
}

