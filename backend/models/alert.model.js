const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var alertSchema = new Schema({
    text: {type:  String, required: true},
    severity: {type:  String, required: true}
},{
    timestamps: true
});

const Alert = mongoose.model('Alert',alertSchema);

module.exports = Alert;