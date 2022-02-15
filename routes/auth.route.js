
const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewToken, refreshToken } = require('../controllers/auth.controller');
const { validateFields, validateJWT, validateRefreshJWT } = require('../middlewares/index');

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

router.post('/refreshtoken', [
    validateRefreshJWT,
    validateFields
], refreshToken)



module.exports = router;