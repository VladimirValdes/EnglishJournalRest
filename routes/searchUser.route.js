const { Router } = require('express');

const route = Router();

const { validateJWT } = require('../middlewares/index.js');
const { searchAll, search, filter, countRegister, filterByDate, countRegisterByDates } = require('../controllers/searchUser.controller');



route.get('/all/:term', validateJWT, searchAll);
route.get('/:collection/:term',  validateJWT, search);
route.get('/:collection/:field/:value', validateJWT, filter);
route.get('/count', validateJWT, countRegister);
route.post('/datescount', validateJWT, countRegisterByDates);
route.post('/dates', validateJWT, filterByDate);




module.exports = route;