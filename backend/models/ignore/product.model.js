const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type:  String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    imageUrl: {type: String},
}, {
    timestamps: true
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;