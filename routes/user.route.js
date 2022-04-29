
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const { 
    isRoleValido,
    emailExist,
    userExitsById
} = require('../helpers/db-validatiors');

const router = Router();

const {
    userGet,
    userGetById,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user.controller')

router.get('/', validateJWT, userGet);

router.get('/:id',[
	validateJWT,
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	validateFields
], userGetById);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('password', 'Password should be greater than').isLength({ min: 6 }),
	check('email', 'Email is not valid').isEmail(),
	check('email').custom( emailExist ),
	validateFields
], userPost);

router.put('/:id',[
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	check('role').custom( isRoleValido ),
	validateFields
], userPut);

router.delete('/:id', [
	validateJWT,
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	validateFields
], userDelete);


module.exports = router;

