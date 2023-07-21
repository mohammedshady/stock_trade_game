// cosmosdb-init.js
const { CosmosClient } = require("@azure/cosmos");

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
    return items[0];
  } else {
    // User not found
    return null;
  }
}

async function getStockPriceFromAllStocks(stockKey, day) {
  const container = db.container("STOCK");
  // Use a query to retrieve the user with the specified ID
  const querySpec = {
    query: `SELECT stock.price from c join stock in c["${stockKey}"] where stock.day = @day`,
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
    return items[0].price;
  } else {
    // User not found
    return null;
  }
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

module.exports = {
  initializeCosmosDB,
  createUser,
  getAllUsers,
  getUserById,
  getUserStocksById,
  getStockPriceFromAllStocks,
  updateUserInfo,
};
