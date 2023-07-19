const express = require("express");
const  initializeCosmosDB = require("./db");
const port = process.env.PORT || 3000;
const app = express();

async function startApp() {
  try {
    await initializeCosmosDB();

    //Routes
    //app.use("/api/user", userRoute);
   
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error initializing the app:", err);
  }
}

startApp();