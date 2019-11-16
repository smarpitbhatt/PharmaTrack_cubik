const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var vendorSchema = new Schema({
    name: {type:  String, required: true},
    product: {type: String, required: true},
    quantity: {type: Number, required: true},
    expiry: {type: Date},
    price: {type: Number},
    expectedDelivery: {type: Number, required: true}
}, {
    timestamps: true
});

const Vendor = mongoose.model('Vendor',vendorSchema);

module.exports = Vendor;