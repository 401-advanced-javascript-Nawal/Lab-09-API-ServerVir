'use strict';

const express = require('express');
const router = express.Router();

const catMod = require('../models/categories-mod/categories-model.js');
const proMod = require('../models/products-mod/products-model.js');

// makes the products and categories route generic 
function modelName(req,res,next){
    // make the model name generic globally 
    let model = req.params.model;

    // to modify the middleware request 
    switch(model){
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

// dynamic routes  
router.get('api/v1/:model',getAll)
router.get('api/v1/:model/:id',getOne)
router.post('api/v1/:model',postOne)

function getAll(req,res,next){

} // end of getAll function 

function getOne(req,res,next){

} // end of getOne function

function postOne(req,res,next){

} // end of postOne function
