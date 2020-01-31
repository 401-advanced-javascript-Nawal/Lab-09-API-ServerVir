'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// errors 
const err404 = require('../middleware/404.js');
const err500 = require('../middleware/500.js');

app.use(err404);
app.use(err500);

const apiRouter = require('../routes/api.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(apiRouter);

// Server listening 
module.exports = {
  server : app,
  start : port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT , ()=> console.log(`The App Is a live and Listening on Port No.${PORT}`));
  },
};