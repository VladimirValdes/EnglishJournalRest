
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const {
    adjectiveExists,
    adjectiveExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    adjectiveGet,
    adjectiveGetById,
    adjectivePost,
    adjectivePut,
    adjectiveDelete
} = require('../controllers/adjective.controller');

router.get('/', validateJWT, adjectiveGet);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields
], adjectiveGetById);

router.post('/', [
	validateJWT,
	check('adjective', 'adjective required').not().isEmpty(),
	check('adjective').custom( adjectiveExists ),
	validateFields
], adjectivePost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields
], adjectivePut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields
], adjectiveDelete);


module.exports = router;

