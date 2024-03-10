// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employee');

connectDB();

const port = process.env.PORT || 80;

app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use employee routes
app.use('/api/employee', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'failure',
    message: 'Server error',
    payload: {
      error: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});