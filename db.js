// cosmosdb-init.js
const  {CosmosClient}  = require("@azure/cosmos");

// Provide required connection from environment variables
const key = process.env.COSMOS_KEY;
// Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
const endpoint = process.env.COSMOS_ENDPOINT;

const databaseId = "stock_trade_game";

const containerNames = ["USER", "GAME", "STOCK"];

async function initializeCosmosDB() {
  const client = new CosmosClient({ endpoint, key });
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  for (const containerName of containerNames) {
    await database.containers.createIfNotExists({ id: containerName });
  }

  console.log(`Azure Cosmos DB initialized. Database ID: ${database.id}`);
  return { client, database };
}

module.exports = initializeCosmosDB;
