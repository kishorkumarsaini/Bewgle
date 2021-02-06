const mongoose = require('mongoose');

const JsonSchema = new mongoose.Schema({
    date: Date,
    method: String,
    headers: {
        Type: String,
        defaulf: ''
    },
    path: String,
    query: {
        Type: String,
        defaulf: ''
    },
    body: {
        Type: String,
        default: ''

    },
    duration: Number

});

const JsonModel = mongoose.model('Data', JsonSchema);

module.exports = JsonModel;