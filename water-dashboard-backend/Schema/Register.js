var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Register = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Register', Register);
