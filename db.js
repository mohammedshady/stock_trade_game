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

module.exports = {
  initializeCosmosDB,
  createUser,
  getAllUsers,
};
