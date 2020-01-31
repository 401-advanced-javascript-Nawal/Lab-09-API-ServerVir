'use strict';

const express = require('express');
const router = express.Router();

const catMod = require('../models/categories-mod/categories-model.js');
const proMod = require('../models/products-mod/products-model.js');

// makes the products and categories route generic 
function modelName(req,res,next){
    // make the model name generic globally 
    let modelN = req.params.model;

    // to modify the middleware request 
    switch(modelN){
        // api/v1/modelN === api/v1/categories 
        case "catMod" : 
        req.model = catMod;
        next();
        return;

        // api/v1/modelN === api/v1/produts 
        case "proMod" : 
        req.model = proMod;
        next();
        return;

        // if the model name invalid , the middleware error will occars 
        default: 
        next(' This model Name Not Exist');
        return;

    } // end of switch statement 

} // end of modelname function 


// request params ( :modelN )
router.param('model',modelName);
