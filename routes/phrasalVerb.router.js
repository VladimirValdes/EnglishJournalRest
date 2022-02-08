
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
    phrasalVerbDelete,
	phrasalVerbGetByUser
} = require('../controllers/phrasalVerb.controller');

router.get('/', validateJWT, phrasalVerbGet);
router.get('/user', validateJWT, phrasalVerbGetByUser);


router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields
], phrasalVerbGetById);

router.post('/', [
	validateJWT,
	check('phrasalVerb', 'phrasalVerbis required').not().isEmpty(),
	// check('phrasalVerb').custom( phrasalVerbExists ),
	validateFields,
	phrasalVerbExists
], phrasalVerbPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields,
	phrasalVerbExists
], phrasalVerbPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( phrasalVerbExitsById ),
	validateFields
], phrasalVerbDelete);


module.exports = router;

