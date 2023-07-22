const router = require("express").Router();
//const { v4: uuidv4 } = require('uuid');
const { customAlphabet } = require('nanoid'); //package for unique ID generation
const generateNumericID = customAlphabet('1234567890', 4); //ID's are of length 4 digits


//generating a game
router.post("/game", (req,res)=>{
    try {
        // Extract data from the request body
        const gameData = req.body; // Assuming the request body contains the necessary game data
    
        // For demonstration purposes, let's assume the game session object has the following structure:
        const newGameSession = {
        //  sessionId: '123456', // A unique identifier for the game session
          players: gameData.players, // Players participating in the game
          status: 'created', // Status of the game session
        };
    
        // we need to store the newGameSession in a database 
    
        // Send the new game session in the response
        res.status(201).json(newGameSession); // HTTP status 201 (Created) and the game session object as JSON response
      } catch (error) {
        console.error('Error creating game session:', error);
        res.status(500).json({ error: 'Failed to create a new game session.' });
      }

});


// user action (buy)
router.post("/game/money", (req,res)=>{
    try {
        // For demonstration purposes, we should link with db
        const gameSessionData = {
          //sessionId: '123456', // Unique identifier for the game session
          players: [
            { name: 'Player1', money: 2000.0, stocks: {} },
            { name: 'Player2', money: 1800.0, stocks: {} },
          ],
          availableStocks: [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.0 },
            { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.75 },
          ],
        };
    
        // Assuming the request body contains the data needed to process the stock purchase
        const { playerName, stockSymbol, quantity } = req.body;
    
        // Find the player who is making the purchase
        const player = gameSessionData.players.find((p) => p.name === playerName);
        if (!player) {
          return res.status(404).json({ error: 'Player not found.' });
        }
    
        // Find the selected stock from the availableStocks list
        const selectedStock = gameSessionData.availableStocks.find((s) => s.symbol === stockSymbol);
        if (!selectedStock) {
          return res.status(404).json({ error: 'Stock not found.' });
        }
    
        // Calculate the total cost of the purchase
        //const totalCost = selectedStock.price * quantity;
    
        // Check if the player has enough money to buy the stock
        if (player.money < totalCost) {
          return res.status(400).json({ error: 'Insufficient funds to buy the stock.' });
        }
    
        // Update the player's money and stocks after the purchase
       // player.money -= totalCost;
        player.stocks[stockSymbol] = (player.stocks[stockSymbol] || 0) + quantity;
         // we need to save the updated amount in user db
    
        // Send the updated player's data in the response
        res.status(200).json(player);
      } catch (error) {
        console.error('Error updating player money:', error);
        res.status(500).json({ error: 'Failed to update player money.' });
      }

});


//user action sell
router.post("/game/money", (req,res)=>{

    try {
      // For demonstration purposes, we should link with db
        const gameSessionData = {
         // sessionId: '123456', // Unique identifier for the game session
          players: [
            { name: 'Player1', money: 2000.0, stocks: { AAPL: 5, GOOGL: 10 } },
            { name: 'Player2', money: 1800.0, stocks: { MSFT: 7 } },
          ],
          availableStocks: [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.0 },
            { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.75 },
          ],
        };
    
        // Assuming the request body contains the data needed to process the stock sale
        const { playerName, stockSymbol, quantity } = req.body;
    
        // Find the player who is selling the stock
        const player = gameSessionData.players.find((p) => p.name === playerName);
        if (!player) {
          return res.status(404).json({ error: 'Player not found.' });
        }
    
        // Find the selected stock from the availableStocks list
        const selectedStock = gameSessionData.availableStocks.find((s) => s.symbol === stockSymbol);
        if (!selectedStock) {
          return res.status(404).json({ error: 'Stock not found.' });
        }
    
        // Check if the player has the stock to sell
        if (!player.stocks[stockSymbol] || player.stocks[stockSymbol] < quantity) {
          return res.status(400).json({ error: 'Insufficient stocks to sell.' });
        }
    
        // Calculate the total amount gained from the sale
        //const totalAmount = selectedStock.price * quantity;
    
        // Update the player's money and stocks after the sale
        //player.money += totalAmount;
        player.stocks[stockSymbol] -= quantity;   
        // we need to save the updated amount in user db
       
    
        // Send the updated player's data in the response
        res.status(200).json(player);
      } catch (error) {
        console.error('Error updating player money:', error);
        res.status(500).json({ error: 'Failed to update player money.' });
      }

});

//loading game
router.get("/game/stocks", (req,res)=>{
    try {

        // For demonstration purposes, we should link with db
        const stocksData = [
          { symbol: 'AAPL', name: 'Apple Inc.', price:  5},
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price:5  },
          { symbol: 'MSFT', name: 'Microsoft Corporation', price:5  },
          { symbol: 'IBM', name: 'IBM', price: 5 },
          { symbol: 'META', name: 'Meta', price:5  }
        ];
    
        
        // Send the stocks data in the response
        res.status(200).json(stocksData); 
      } catch (error) {
        console.error('Error loading stocks data:', error);
        res.status(500).json({ error: 'Failed to load game data for stocks.' });
      }
   

});


           

// end game
router.post('/game/end', (req, res) => {
  try {
    // Assuming you have access to the game session data, including player details, available stocks, and game rounds
    // For demonstration purposes, let's assume we have some sample game session data
    const gameSessionData = {
      sessionId: '123456', // Unique identifier for the game session
      players: [
        { name: 'User', money: 2000.0, stocks: { AAPL: 5, GOOGL: 10 } },
        { name: 'AI', money: 1800.0, stocks: { MSFT: 7 } },
      ],
      availableStocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.0 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.75 },
      ],
      currentRound: 10, // Current round of the game
      maxRounds: 15, // Maximum number of rounds for the game
      timeLimit: 600, // Time limit for the game in seconds (10 minutes)
    };

    // Determine the conditions for ending the game
    let isGameEnded = false;
    let gameResult = '';

    if (gameSessionData.currentRound >= gameSessionData.maxRounds) {
      // The game ends when the maximum number of rounds is reached
      isGameEnded = true;
      gameResult = 'Maximum rounds reached. Game ended.';
    } else {
      // Check if the time limit has been reached (assuming the time is tracked separately)
      const currentTime = 600; // For demonstration purposes, let's assume 600 seconds (10 minutes)
      if (currentTime >= gameSessionData.timeLimit) {
        isGameEnded = true;
        gameResult = 'Time limit reached. Game ended.';
      }
    }

    // Calculate the final portfolio value for each player
    const calculatePortfolioValue = (player) => {
      let portfolioValue = player.money;
      for (const stockSymbol in player.stocks) {
        const stock = gameSessionData.availableStocks.find((s) => s.symbol === stockSymbol);
        if (stock) {
          portfolioValue += player.stocks[stockSymbol] * stock.price;
        }
      }
      return portfolioValue;
    };

    const userPortfolioValue = calculatePortfolioValue(gameSessionData.players[0]);
    const aiPortfolioValue = calculatePortfolioValue(gameSessionData.players[1]);

    // Update the game session data with the final portfolio values if needed
    // ...

    // Send the game result and final portfolio values in the response
    const resultData = {
      isGameEnded,
      gameResult,
      userPortfolioValue,
      aiPortfolioValue,
    };

    res.status(200).json(resultData);
  } catch (error) {
    console.error('Error ending the game:', error);
    res.status(500).json({ error: 'Failed to end the game and calculate the final portfolio values.' });
  }
});




module.exports = router;