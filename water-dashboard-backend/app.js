const express = require('express');
const cors = require("cors");
const app = express();
const connectDB = require('./config/db');
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

app.get('/api/employee', (req, res) => {
  const employeeData = {
    id: 1,
    name: 'John Doe',
    position: 'Developer',
  };

  console.log("employee call");
  // Sending JSON response
  res.json({
    status: 'success',
    message: 'Employee data retrieved successfully',
    data: employeeData,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
