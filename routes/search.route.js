const { Router } = require('express');

const route = Router();

const { validateJWT } = require('../middlewares/index.js');
const { searchAll, search, filter } = require('../controllers/search.controller');



route.get('/all/:term', validateJWT, searchAll);
route.get('/:collection/:term',  validateJWT, search);
route.get('/:collection/:field/:value', validateJWT, filter)


module.exports = route;