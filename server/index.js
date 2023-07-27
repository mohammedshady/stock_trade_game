const express = require("express");
const userRoute = require("./routes/user");
const gameRoute = require("./routes/game");
const { initializeCosmosDB } = require("./db");

const cors = require("cors");
//route folder remove
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
initializeCosmosDB();

//Routes
app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
