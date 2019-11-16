const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var vendorOrderSchema = new Schema({
    vId: {type:  String, required: true},
    pharmacyName: {type:  String, required: true},
    medicineName: {type:  String, required: true},
    quantity: {type: Number, required: true},
    status: {type: "String"},
    expectedDelivery: {type: Date},
    expiryDate: {type: Date},
    vname:String
});

const VendorOrder = mongoose.model('VendorOrder', vendorOrderSchema);

module.exports = VendorOrder;