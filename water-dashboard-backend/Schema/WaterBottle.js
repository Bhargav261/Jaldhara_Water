var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaterBottle = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    number_of_bottle: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('WaterBottle', WaterBottle);