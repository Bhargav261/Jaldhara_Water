// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const loginRoutes = require('./routes/login');
const employeeRoutes = require('./routes/employee');
const waterBottleRoutes = require('./routes/waterBottle');

connectDB();

const port = process.env.PORT || 80;

app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use(express.json());

// Use employee routes
app.use('/api/login', loginRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/water_bottle', waterBottleRoutes);

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