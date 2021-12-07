
const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewToken } = require('../controllers/auth.controller');
const { validateFields, validateJWT} = require('../middlewares/index');

const router = Router();

router.post('/login',[
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.get('/renew', [
    validateJWT,
    validateFields
], renewToken )



module.exports = router;