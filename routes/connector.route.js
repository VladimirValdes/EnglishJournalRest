
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const {
    connectorExists,
    connectorExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    connectorGet,
    connectorGetById,
    connectorPost,
    connectorPut,
    connectorDelete,
	connectorsGetByUser
} = require('../controllers/connector.controller');

router.get('/', validateJWT, connectorGet);
router.get('/user', validateJWT, connectorsGetByUser);


router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( connectorExitsById ),
	validateFields
], connectorGetById);

router.post('/', [
	validateJWT,
	check('connector', 'connector required').not().isEmpty(),
	// check('connector').custom( connectorExists ),
	validateFields,
	connectorExists
], connectorPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	// check('id').custom( connectorExitsById ),
	validateFields,
	connectorExists
], connectorPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( connectorExitsById ),
	validateFields
], connectorDelete);


module.exports = router;

