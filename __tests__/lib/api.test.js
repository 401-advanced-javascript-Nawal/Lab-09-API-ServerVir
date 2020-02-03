'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('api server', () => {

 /**************** Errors ****************/

it('404 Error , Invalid route ', () => {
  return mockRequest
    .get('/main')
    .then(data => {
      expect(data.status).toBe(404);
    }).catch(e => console.error(e));
}); // 404

it('404 Error , Invalid method ', () => {
  return mockRequest
    .delete('/')
    .then(data => {
      expect(data.status).toBe(404);
    }).catch(e => console.error(e));
}); // 404

});