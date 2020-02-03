'use strict';

/**
 * print out the request method and path 
 */
module.exports = (req, res, next) => {
  console.log(' request Information => ',req.method, req.path);
  next();
};