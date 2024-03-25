const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../Schema/Employee');

router.post('/', auth, async (req, res, next) => {
    try {
        const { search } = req.body;

        let query = {};
        if (search) {
            query = { name: { $regex: new RegExp(search, 'i') } };
        }

        const data = await Employee.find(query);
        res.json({
            status: 'success',
            message: 'Employees retrieved successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/addEdit', async (req, res, next) => {
    try {
        const { id, name, price } = req.body;

        if (id) {
            const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, price }, { new: true });

            const responseMessage = updatedEmployee
                ? { status: 'success', message: 'Employee updated successfully', data: updatedEmployee }
                : { status: 'failure', message: 'Something went wrong. Please try again.', error: 'Employee update failed' };

            res.json(responseMessage);
        } else {
            const employeeData = { name, price };
            const newEmployee = new Employee(employeeData);
            const savedEmployee = await newEmployee.save();

            const responseMessage = savedEmployee
                ? { status: 'success', message: 'Employee added successfully', data: employeeData }
                : { status: 'failure', message: 'Something went wrong. Please try again.', error: 'Employee add failed' };

            res.json(responseMessage);
        }
    } catch (error) {
        next(error);
    }
});


router.post('/edit', async (req, res, next) => {
    try {
        const { id, name } = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name: name },
            { new: true }
        );

        if (updatedEmployee) {
            res.json({
                status: 'success',
                message: 'Employee updated successfully',
                data: updatedEmployee,
            });
        } else {
            res.json({
                status: 'failure',
                message: 'Something went wrong. Please try again.',
                error: 'Employee update failed',
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (deletedEmployee) {
            res.json({
                status: 'success',
                message: 'Employee deleted successfully',
                data: deletedEmployee,
            });
        } else {
            res.json({
                status: 'failure',
                message: 'Something went wrong. Please try again.',
                error: 'Employee deletion failed',
            });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
