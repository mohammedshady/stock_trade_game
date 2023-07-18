const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});