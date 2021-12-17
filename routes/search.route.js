const { Router } = require('express');

const route = Router();

const { validateJWT } = require('../middlewares/index.js');
const { searchAll, search } = require('../controllers/search.controller');



route.get('/all/:term', validateJWT, searchAll);
route.get('/:collection/:term',  validateJWT, search);


module.exports = route;