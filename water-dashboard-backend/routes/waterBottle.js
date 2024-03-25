const express = require('express');
const router = express.Router();
const WaterBottle = require('../Schema/WaterBottle');

router.post('/', async (req, res, next) => {
    try {
        const { search } = req.body;

        let query = {};
        if (search) {
            query = { name: { $regex: new RegExp(search, 'i') } };
        }

        const data = await WaterBottle.find(query);
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
        const { id, employeeId, number_of_bottle, price, total, order_date } = req.body;

        if (id) {
            const updateRecord = await WaterBottle.findByIdAndUpdate(id, { number_of_bottle, price, total, order_date }, { new: true });

            const responseMessage = updateRecord
                ? { status: 'success', message: 'Water Bottle updated successfully', data: updateRecord }
                : { status: 'failure', message: 'Something went wrong. Please try again.', error: 'update failed' };

            res.json(responseMessage);
        } else {
            const newRecord = { employeeId, number_of_bottle, price, total, order_date };
            const recordRequest = new WaterBottle(newRecord);
            const saveRequest = await recordRequest.save();

            const responseMessage = saveRequest
                ? { status: 'success', message: 'Water Bottle added successfully', data: newRecord }
                : { status: 'failure', message: 'Something went wrong. Please try again.', error: 'add failed' };

            res.json(responseMessage);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body;

        const deleteRecord = await WaterBottle.findByIdAndDelete(id);

        if (deleteRecord) {
            res.json({
                status: 'success',
                message: 'Water Bottle deleted successfully',
                data: deleteRecord,
            });
        } else {
            res.json({
                status: 'failure',
                message: 'Something went wrong. Please try again.',
                error: 'deletion failed',
            });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
