const router = require("express").Router();
const crypto = require('crypto');

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserStocksById,
} = require("../db");

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
    const uniqueID = crypto.randomUUID();
    const player = {
      id : uniqueID,
      name: req.body.name,
      password : req.body.password,
      money: 5000,
      stocks: [
        { key: "MSFT", num_shares: 0 },
        { key: "IBM", num_shares: 0 },
        { key: "TSLA", num_shares: 0 },
        { key: "META", num_shares: 0 },
        { key: "AAPL", num_shares: 0 },
      ],
    };
    //check that user entered a unique username (for SignUp & Login)
    const userExists = await FindUser(player.name);
    if(userExists)
    {
      return res.status(500).json({message:"User Already Exists, try another Username or Login"});
    }
    // Save the new user to the database (using the createUser function)
    const user = await createUser(player);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle any errors that occurred during user creation
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
