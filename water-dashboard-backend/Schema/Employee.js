var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Employee', Employee);