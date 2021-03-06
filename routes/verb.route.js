
const { Router, request } = require('express');
const { check, body } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const { 
    verbExists,
	isNotSameVerb,
	verbExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    verbGet,
    verbGetById,
	verbGetByUser,
    verbPost,
    verbPut,
    verbDelete
} = require('../controllers/verb.controller');

router.get('/', validateJWT, verbGet);
router.get('/user', validateJWT, verbGetByUser);


router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( verbExitsById ),
	validateFields
], verbGetById);

router.post('/', [
	validateJWT,
	check('baseForm', 'Base form is required').not().isEmpty(),
	check('pastSimple', 'Past Simple is required').not().isEmpty(),
	check('pastParticiple', 'Past Participle is required').not().isEmpty(),
	check('type', 'Past Simple is required').not().isEmpty(),
	check('nik', 'N-I-K is required').not().isEmpty(),
	validateFields,
	verbExists,
], verbPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( verbExitsById ),
	validateFields,
	isNotSameVerb,
], verbPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( verbExitsById ),
	validateFields
], verbDelete);


module.exports = router;

