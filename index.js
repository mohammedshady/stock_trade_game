const express = require("express");
//to be un uncommented
//const userRoute = require("./routes/user");

const { initializeCosmosDB } = require("./db");
const port = 3000;

const app = express();
app.use(express.json());
initializeCosmosDB();

//to be uncommented
//app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
