const router = require("express").Router();


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
   const {id} = req.params; // -> destructure id from params

  // Extract the player ID from the request parameter

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
      stocks: [], //stocks array is initially empty 
    };
    users.push(player);
    res.status(201).json({ message: 'User created successfully', users });
  });



////////////////////////////////// UNDER PROGRESS //////////////////////////////

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


//delete stock from array of stocks [of a certain player (based on ID)]

//put money [automated for BUY and SELL actions]

//put stock [update an entry]

//update number of shares & money value at each BUY or SELL request

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