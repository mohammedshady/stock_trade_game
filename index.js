const express = require("express");
const userRoute = require("./routes/user");
const { initializeCosmosDB } = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
initializeCosmosDB();

//Routes
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
