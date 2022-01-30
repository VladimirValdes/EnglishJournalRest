const { Router } = require('express');

const route = Router();

const { validateJWT } = require('../middlewares/index.js');
const { searchAll, search, filter, countRegister } = require('../controllers/searchUser.controller');



route.get('/all/:term', validateJWT, searchAll);
route.get('/:collection/:term',  validateJWT, search);
route.get('/:collection/:field/:value', validateJWT, filter);
route.get('/count', validateJWT, countRegister);



module.exports = route;