const { Router } = require('express');

const route = Router();

const { validateJWT } = require('../middlewares/index.js');
const { searchAll } = require('../controllers/search.controller');



route.get('/all/:term', validateJWT, searchAll);
// route.get('/:coleccion/:termino',  validateJWT, buscar);


module.exports = route;