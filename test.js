import { CosmosClient } from '@azure/cosmos';

const DB_NAME = 'cosmosbookstore';

const db = {
  _dbClient: null,
  connect: async function (url, primaryKey) {
    const cosmosClient = new CosmosClient({ endpoint: url, key: primaryKey });
    const { database } = await cosmosClient.databases.createIfNotExists({ id: DB_NAME });
    const { container } = await database.containers.createIfNotExists({ id: 'your-container-id' });

    console.log("Connected to Cosmos DB using the NoSQL API");
    this._dbClient = container;
  },

  getConnection: function () {
    if (!this._dbClient) {
      console.log('You need to call .connect() first!');
      process.exit(1);
    }
    return this._dbClient;
  }
};

export default db;
export { db };