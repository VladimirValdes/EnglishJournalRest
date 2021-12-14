
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const { 
    verbExists,
	verbExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    verbGet,
    verbGetById,
    verbPost,
    verbPut,
    verbDelete
} = require('../controllers/verb.controller');

router.get('/', validateJWT, verbGet);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( verbExitsById ),
	validateFields
], verbGetById);

router.post('/', [
	validateJWT,
	check('baseForm', 'Base form is required').not().isEmpty(),
	check('baseForm').custom( verbExists ),
	check('pastSimple', 'Past Simple is required').not().isEmpty(),
	check('pastParticiple', 'Past Participle is required').not().isEmpty(),
	check('type', 'Past Simple is required').not().isEmpty(),
	check('nik', 'N-I-K is required').not().isEmpty(),
	validateFields
], verbPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], verbPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], verbDelete);


module.exports = router;

