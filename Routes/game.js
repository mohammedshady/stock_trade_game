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
router.put("/game/money", (req,res)=>{
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
        const totalCost = selectedStock.price * quantity;
    
        // Check if the player has enough money to buy the stock
        if (player.money < totalCost) {
          return res.status(400).json({ error: 'Insufficient funds to buy the stock.' });
        }
    
        // Update the player's money and stocks after the purchase
        player.money -= totalCost;
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
router.put("/game/money", (req,res)=>{

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
        const totalAmount = selectedStock.price * quantity;
    
        // Update the player's money and stocks after the sale
        player.money += totalAmount;
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


            //probably will completely change it later but just "متسيبش الورقة فاضية" 

// end game
router.get("/game/", (req,res)=>{
    try {
        
             // For demonstration purposes, we should link with db
        const gameSessionData = {
        //  sessionId: '123456', // Unique identifier for the game session
          players: [
            { name: 'Player1', money: 5000 },
            { name: 'Player2', money: 5000 },
            { name: 'Player3', money: 5000 },
          ],
          status: 'ended', // Status of the game session
        };
    
        // You can fetch the gameSessionData from a database or any other data store if needed
        // ...
    
        // Determine the winner based on the final amount of money each player has
        let winner = null;
        let maxMoney = 0;
        for (const player of gameSessionData.players) {
          if (player.money > maxMoney) {
            maxMoney = player.money;
            winner = player;
          }
        }
    
        // You can update the gameSessionData with the winner information if needed
        // ...
    
        // Send the winner details in the response
        res.status(200).json(winner); // HTTP status 200 (OK) and the winner details as JSON response
      } catch (error) {
        console.error('Error ending game session:', error);
        res.status(500).json({ error: 'Failed to end the game session and determine the winner.' });
      }



});

module.exports = router;