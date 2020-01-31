'use strict';

const express = require('express');
const router = express.Router();

const catMod = require('../models/categories-mod/categories-model.js');
const proMod = require('../models/products-mod/products-model.js');

// makes the products and categories route generic 
function modelName(req, res, next) {
    // make the model name generic globally 
    let model = req.params.model;

    // to modify the middleware request 
    switch (model) {
        // api/v1/modelN === api/v1/categories 
        case 'catMod':
            req.model = catMod;
            next();
            return;

        // api/v1/modelN === api/v1/produts 
        case 'proMod':
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
router.param('model', modelName);

// dynamic routes  
router.get('/api/v1/:model', getAll);
router.get('/api/v1/:model/:id', getOne);
router.post('/api/v1/:model',postOne);
// router.update('/api/v1/:model/:id', updateOne);
// router.delete('/api/v1/:model/:id', deleteOne);


function getAll(req, res, next) {

    req.model.get()
        .then(data => {
            let count = data.length;
            res.status(200).json({ count, data });
        })
        .catch(next);
} // end of getAll function 

function getOne(req, res, next) {
    let id = req.param.id;
    req.model.get(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
} // end of getOne function

function postOne(req, res, next) {
    console.log('req.body : ', req.body);
    req.model.post(req.body)
        .then( data =>
            {
                res.status(201).json(data);
            })
            .catch(next);
} // end of postOne function

function updateOne(req, res, next) {
    let id = req.param.id;
    req.model.update(id,req.body)
        .then( data =>
            {
                res.status(200).json(data);
            })
            .catch(next);
} // end of updateOne function

function deleteOne(req, res, next) {
    let id = req.param.id;
    req.model.delete(id)
        .then( data =>
            {
                res.status(200).json(data);
            })
            .catch(next);
} // end of deleteOne function

module.exports = router;