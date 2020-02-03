'use strict';

const server = require('./lib/server.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const catsch = require('./models/categories-mod/categories-schema.js');
const prosch = require('./models/products-mod/products-schema.js');

const MONGOOSE_URI='mongodb://localhost:27017/serverVir';

dotenv.config();
//const MONGOOSE_URI = 'mongodb://localhost:27017/class08';

mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology:true });

server.start();
