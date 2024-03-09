const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
