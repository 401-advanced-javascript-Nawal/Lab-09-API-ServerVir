
'use strict';

const mongoose = require('mongoose');
require('../products-mod/products-schema.js')

const categories = mongoose.Schema({
  name: { type: String, required: true },
}, {toObject : { virtuals: true},toJSON : {virtuals :true}});

// collection/model name 
categories.virtual('realPro', {
    // collection/model name (categories)
    ref : 'products',
    // name inside categories schema 
    localField : 'name',
    foreignField : 'category',
    justOne : false
}); // end of mock categories 


// do it before starting 
categories.pre('findOne', function () {
    try {
        // the virtual name we have been created 
        this.populate('realPro');
    }
    catch (err) {
        console.error(err);
    }
}); // end of population for categories 

module.exports = mongoose.model('categories', categories);