const express = require("express");
//to be un uncommented
const gameRoute = require("./Routes/game");

const { initializeCosmosDB } = require("./db");
const port = 3000;

const app = express();
app.use(express.json());
initializeCosmosDB();

//to be uncommented
app.use("/api/game", gameRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
