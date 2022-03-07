
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');
const { loadFile } = require('../controllers/uploads.controller');

const router = Router();


router.post('/', [
	validateJWT,
	validateFields,
], loadFile);

module.exports = router;
