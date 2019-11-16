const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var billSchema = new Schema({
    custname: {type:  String, required: true},
    docname: {type:  String, required: true},
    contact: {type:  String, required: true},
    items: [Object],
    total: {type: Number, required: true},
    // discount: {type: Number},
    tax: {type: Number} ,
    date: {type: Date}
});

const Bill = mongoose.model('Bill',billSchema);

module.exports = Bill;