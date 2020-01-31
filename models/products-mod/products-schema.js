'use strict';

const mongoose = require('mongoose');
require('../categories-mod/categories-schema.js')

const products = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: 'number', required: true },
    weight: { type: 'number' },
    quantity_in_stock: { type: 'number', required: true },
    category: { type: String, required: true }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

products.virtual('realCat', {
    // collection/model name (categories)
    ref: 'categories',
    // category inside products schema 
    localField: 'category',
    foreignField: 'name',
    justOne: false
}); // end of mock products 

// do it before starting 
products.pre('findOne', function () {
    try {
        // the virtual name we have been created 
        this.populate('realCat');
    }
    catch (err) {
        console.error(err);
    }
}); // end of population for products 


module.exports = mongoose.model('products', products);