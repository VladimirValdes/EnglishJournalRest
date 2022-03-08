
const { Router } = require('express');
const { check } = require('express-validator');

const {
    allowCollection
} = require('../helpers/db-validatiors');

const { validateFields, validateJWT, validateFileUpload } = require('../middlewares/index');
const { loadFile, updateImage } = require('../controllers/uploads.controller');

const router = Router();


router.post('/', [
	validateJWT,
	validateFileUpload,
	validateFields,
], loadFile);

router.put('/:collection/:id',[
	validateJWT,
	validateFileUpload,
    check('id', 'Id is not valid').isMongoId(),
	check('collection').custom( c => allowCollection( c, ['users'])),
	validateFields,
], updateImage)

module.exports = router;
