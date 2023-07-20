const router = require("express").Router();

// stock object
// key (ex: MSFT) linked with database of stocks
// num_shares => number of shares a user posses of a certain stock

// to be added
// 1- uuid
// 2- fix initial amount of money
// 3- test users list is actually updated 

let users = []; 

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
   const {id} = req.params; // -> destructure id from params
  // Find the player with the corresponding ID in the users array
  const player = users.find(user => user.id === id);
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});


//adding a new player
router.post("/users", (req, res) => {
    const player = {
      id: req.body.id,
      name: req.body.name, // -> title->name
      money: req.body.money,
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

//get stocks of a certain player (based on ID)
router.get("/users/player/:id/stocks", (req, res) => {
    const {id} = req.params; // -> destructure id from params
    // Find the player with the corresponding ID in the users array
    const player = users.find(user => user.id === id);
    if (player) {
      res.status(200).json(player.stocks);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  });

module.exports = router;

////////////////////////////////// UNDER PROGRESS //////////////////////////////
//test: check if data actually changes in users list

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

/////////////////////////////// FOR FURTHER OPTIONS ////////////////////////////

//delete API for a player in case they quit in middle of game

/////////////////////////////////////// NOTES //////////////////////////////////

// Steps:
// check if stock.key is found
// if yes; put Money and num_shares
// if no; check action (BUY or SELL)
//        if buy; post 
//        if sell; 404 (may use throw later)

// if money < stock.price, buy action -> cannot perform
//put request for updating or deleting from the stocks array and updating money 
//if the stock key is not found, 404 is returned
//if the key is found, just update the number of shares and Money
//this is to be used for "SELL" action

//put request for updating or posting to the stocks array and updating money 
//if the stock key is not found, add it to the stocks array
//if the key is found, just update the number of shares and Money 
//this is to be used for "BUY" action


/////////////////////////////// COMMENTED FUNCTIONS (MAY USE LATER) //////////////////////////

/*
//post stock -> add a stock to array of stocks of a certain player (based on ID)
router.post("/users/player/:id", (req, res) => {
    //to ensure the player is found
    const {id} = req.params; // -> destructure id from params
    const index = users.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "player not found" });
    }
    // player is found
    const stock = {
      key: req.body.key,
      name: req.body.name,
      price: req.body.price, //price per share
      num_shares: req.body.num_shares, // -> shares->num_shares
      // money_val : price * num_shares, //total value of money from this stock
    };
    users[index].stocks.push(stock); // push stock to the stocks array of the player found
    res.status(201).json({ message: 'New stock added successfully', user: users[index] });
  });
  */

  // incomplete fn
  /*
  router.put("/users/player/:id/stocks/:key/:shares_sell/sell", (req, res) => {
 //to ensure the player is found
  const {id} = req.params; // -> destructure id from params
  const player_index = users.findIndex((t) => t.id === id);
  
  if (player_index === -1) 
  {
   return res.status(404).json({ error: "player not found" });
  }
  // player is found 
  const key = req.params; // get stock key from params
  const shares_sell = req.params; //number of shares to be sold
  const stock_index = users[player_index].findIndex((t)=> t.key === key); //stock to be modified
  const targetKey = key;
  const targetElement = player.stocks.find(item=>item.key === targetKey && item.num_shares >= to_sell)
  if(targetElement)
  {
    users[player_index].stocks[stock_index].num_shares -= 
  }
});
*/
