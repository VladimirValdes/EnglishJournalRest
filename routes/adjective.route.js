
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
    adjectiveDelete,
	adjectiveGetByUser
} = require('../controllers/adjective.controller');

router.get('/', validateJWT, adjectiveGet);

router.get('/user', validateJWT, adjectiveGetByUser);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields
], adjectiveGetById);



router.post('/', [
	validateJWT,
	check('adjective', 'adjective required').not().isEmpty(),
	validateFields,
	adjectiveExists
], adjectivePost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields,
	adjectiveExists
], adjectivePut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( adjectiveExitsById ),
	validateFields
], adjectiveDelete);


module.exports = router;

