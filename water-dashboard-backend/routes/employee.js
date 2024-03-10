// routes/employee.js
const express = require('express');
const router = express.Router();
const Employee = require('../Schema/Employee');

// Get all employees
router.get('/', async (req, res, next) => {
    try {
        const data = await Employee.find({});
        res.json({
            status: 'success',
            message: 'Employees retrieved successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
});

// Add a new employee
router.post('/add', async (req, res, next) => {
    try {
        const { name } = req.body;
        const employeeData = { name: name };
        const newEmployee = new Employee(employeeData);
        const savedEmployee = await newEmployee.save();

        if (savedEmployee) {
            res.json({
                status: 'success',
                message: 'Employee added successfully',
                data: employeeData,
            });
        } else {
            res.json({
                status: 'failure',
                message: 'Something went wrong. Please try again.',
                error: 'Employee add failed',
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
