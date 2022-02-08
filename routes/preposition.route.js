
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const {
    prepositionExists,
  	prepositionExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    prepositionGet,
    prepositionGetById,
    prepositionPost,
    prepositionPut,
    prepositionDelete
} = require('../controllers/preposition.controller');

router.get('/', validateJWT, prepositionGet);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( prepositionExitsById ),
	validateFields
], prepositionGetById);

router.post('/', [
	validateJWT,
	check('preposition', 'preposition required').not().isEmpty(),
	// check('preposition').custom( prepositionExists ),
	validateFields,
	prepositionExists
], prepositionPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( prepositionExitsById ),
	validateFields,
	prepositionExists
], prepositionPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( prepositionExitsById ),
	validateFields
], prepositionDelete);


module.exports = router;

