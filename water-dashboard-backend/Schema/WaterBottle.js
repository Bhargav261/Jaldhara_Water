var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaterBottle = new Schema({
    employeeId: {
        type: String,
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
},{
    timestamps: true
});

module.exports = mongoose.model('WaterBottle', WaterBottle);