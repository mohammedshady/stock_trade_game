// cosmosdb-init.js
const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const stockKeyMap = {
  MSFT: "Stock_Data_MSFT",
  IBM: "Stock_Data_IBM",
  TSLA: "Stock_Data_TSLA",
  META: "Stock_Data_META",
  JPM: "Stock_Data_JPM",
};

//DATABASE CONFIG
const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;
const databaseId = "stock_trade_game";
const containerNames = ["USER", "GAME", "STOCK"];

//obj to store database instance
let db;

//Database Initalization
async function initializeCosmosDB() {
  const client = new CosmosClient({ endpoint, key });
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });

  for (const containerName of containerNames) {
    await database.containers.createIfNotExists({ id: containerName });
  }
  db = database; //assign the created database obj to db
  console.log(`Azure Cosmos DB initialized. Database ID: ${database.id}`);
}

// USER DATABASE OPERATIONS

// create user
async function createUser(newItem) {
  const container = db.container("USER");
  const { resource: createdItem } = await container.items.create(newItem);
  return createdItem;
}
// get all users
async function getAllUsers() {
  const container = db.container("USER");
  const { resources: items } = await container.items.readAll().fetchAll();
  return items;
}
// Get a user by their ID
async function getUserById(userId) {
  const container = db.container("USER");
  // Use a query to retrieve the user with the specified ID
  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  // If the user is found, return the first item (user)
  if (items.length > 0) {
    return items[0];
  } else {
    // User not found
    return null;
  }
}

////////////////////////////////////////// AMIRA /////////////////////////////////////////
// fn used for checking whether a username previously exits in the database or not
async function FindUser(name) {
  const container = db.container("USER");
  // Use a query to retrieve the user with the specified ID
  const querySpec = {
    query: "SELECT * FROM c WHERE c.name = @name",
    parameters: [{ name: "@name", value: name }],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  // If the user is found, return the first item (user)
  if (items.length > 0) {
    return true;
  } else {
    // User not found
    return false;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////

async function getUserStocksById(userId) {
  const container = db.container("USER");
  // Use a query to retrieve the user with the specified ID
  const querySpec = {
    query: "SELECT c.stocks FROM c WHERE c.id = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  // If the user is found, return the first item (user)

  if (items.length > 0) {
    return items[0].stocks;
  } else {
    // User not found
    return null;
  }
}

async function getStockPrice(stockKey, day) {
  const container = db.container("STOCK");
  // Use a query to retrieve the user with the specified ID
  const querySpec = {
    query: `SELECT stock.price,stock.differenceBetweenDayBefore from c join stock in c["${stockKey}"] where stock.day = @day`,
    parameters: [
      { name: "@stockKey", value: stockKey },
      { name: "@day", value: day },
    ],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  // If the user is found, return the first item (user)
  if (items.length > 0) {
    return items[0];
  } else {
    // User not found
    return null;
  }
}
async function getStockPriceHistory(stockKey, days) {
  const container = db.container("STOCK");
  const querySpec = {
    query: `SELECT TOP ${days} stock.day , stock.price FROM c JOIN stock IN c["${stockKey}"]`,
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  if (items.length > 0) {
    return items;
  } else {
    return null;
  }
}
async function getStocksDate(day) {
  const container = db.container("STOCK");
  // Use a query to retrieve the user
  const querySpec = `SELECT stock.date from c join stock in c["Stock_Data_IBM"] where stock.day = ${day}`;

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  if (items.length > 0) {
    return items[0];
    // Get the user with the matching userId
  } else {
    return null;
  }
}

async function getStocksData(day) {
  let allStocks = {};
  for (const key of Object.keys(stockKeyMap)) {
    try {
      const stockPrice = await getStockPrice(stockKeyMap[key], day);
      if (stockPrice !== null) {
        allStocks[key] = stockPrice;
      } else {
        console.log(
          `Stock data not found for stock key: ${stockKeyMap[key]} and day: ${day}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return allStocks;
}

async function getHistoryStocksData(days) {
  let allStocks = {};
  for (const key of Object.keys(stockKeyMap)) {
    try {
      const stockPrice = await getStockPriceHistory(stockKeyMap[key], days);
      if (stockPrice !== null) {
        allStocks[key] = stockPrice;
      } else {
        console.log(
          `Stock data not found for stock key: ${stockKeyMap[key]} and day: ${day}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return allStocks;
}

async function updateUserInfo(userId, data) {
  const container = db.container("USER");

  // Use a query to retrieve the user
  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  if (items.length > 0) {
    // Get the user with the matching userId
    const userToUpdate = items[0];

    // Merge the updated info
    const updatedUser = { ...userToUpdate, ...data };

    // Replace the data
    const { resource: result } = await container
      .item(userToUpdate.id)
      .replace(updatedUser);

    return result;
  } else {
    // User not found
    return null;
  }
}

async function createGame(newItem) {
  if (typeof newItem !== "object" || newItem === null) {
    throw new Error("Invalid input. game must be a valid object.");
  }
  const container = db.container("GAME");
  const { resource: createdItem } = await container.items.create(newItem);
  return createdItem;
}

async function getGame(id) {
  const container = db.container("GAME");

  const querySpec = {
    query: `SELECT * from c where c.id = @id`,
    parameters: [{ name: "@id", value: id }],
  };
  const { resources: game } = await container.items.query(querySpec).fetchAll();
  // If the user is found, return the first item (user)
  if (game.length > 0) {
    return game[0];
  } else {
    // User not found
    return null;
  }
}

async function updateGameInfo(gameId, game) {
  const container = db.container("GAME");

  // Use a query to retrieve the user
  const querySpec = {
    query: "SELECT * FROM c WHERE c.id = @gameId",
    parameters: [{ name: "@gameId", value: gameId }],
  };
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  if (items.length > 0) {
    // Get the user with the matching userId
    const gameToUpdate = items[0];

    // Merge the updated info
    const updatedGame = { ...gameToUpdate, ...game };

    // Replace the data
    const { resource: result } = await container
      .item(gameToUpdate.id)
      .replace(updatedGame);

    return result;
  } else {
    // User not found
    return null;
  }
}

module.exports = {
  initializeCosmosDB,
  createUser,
  getAllUsers,
  getUserById,
  getUserStocksById,
  getStockPrice,
  updateUserInfo,
  createGame,
  updateGameInfo,
  getGame,
  getStocksData,
  getHistoryStocksData,
  FindUser,
  getStocksDate,
};
