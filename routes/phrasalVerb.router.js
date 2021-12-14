
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const { 
    phrasalVerbExists,
    phrasalVerbExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    phrasalVerbGet,
    phrasalVerbGetById,
    phrasalVerbPost,
    phrasalVerbPut,
    phrasalVerbDelete
} = require('../controllers/phrasalVerb.controller');

router.get('/', validateJWT, phrasalVerbGet);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields
], phrasalVerbGetById);

router.post('/', [
	validateJWT,
	check('phrasalVerb', 'phrasalVerbis required').not().isEmpty(),
	check('phrasalVerb').custom( phrasalVerbExists ),
	validateFields
], phrasalVerbPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields
], phrasalVerbPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields
], phrasalVerbDelete);


module.exports = router;

