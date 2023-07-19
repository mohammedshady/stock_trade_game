// import { CosmosClient } from "@azure/cosmos";




// // Uniqueness for database and container
// const timeStamp = + new Date();

// // Set Database name and container name with unique timestamp
// const databaseName = `DataBase_${timeStamp}`;
// const containerName = `Container_${timeStamp}`;
// const partitionKeyPath = ["/categoryId"]


// // Authenticate to Azure Cosmos DB
// const cosmosClient = new CosmosClient({ endpoint, key });

// // Create database if it doesn't exist
// const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
// console.log(`${database.id} database ready`);


// // Create container if it doesn't exist
// const { container } = await database.containers.createIfNotExists({
//     id: containerName,
//     partitionKey: {
//         paths: partitionKeyPath
//     }
// });
// console.log(`${container.id} container ready`);


// // find all items with same categoryId (partitionKey)
// const querySpec = {
//     query: "select * from products p where p.categoryId=@categoryId",
//     parameters: [
//         {
//             name: "@categoryId",
//             value: items[2].categoryId
//         }
//     ]
// };

// // Get items 
// const { resources } = await container.items.query(querySpec).fetchAll();

// for (const item of resources) {
//     console.log(`${item.id}: ${item.name}, ${item.sku}`);
// }






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
