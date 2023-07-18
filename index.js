const express = require('express');
const userRoute = require("./routes/user");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

//Routes
app.use("/api/user", userRoute);




// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});