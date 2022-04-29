
const { Router } = require('express');
const { check } = require('express-validator');


const { urlTokenExist } = require('../helpers/db-validatiors');
const { login, renewToken, refreshToken, verified, forgotPassword, verifiedToken, newPassword } = require('../controllers/auth.controller');
const { validateFields, validateJWT, validateRefreshJWT } = require('../middlewares/index');

const router = Router();

router.post('/login',[
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.get('/verified/:token',[
    check('token', 'token is requires').not().isEmpty(),
    check('token').custom(urlTokenExist),
    validateFields
], verified);

router.get('/renew', [
    validateJWT,
    validateFields
], renewToken );

router.post('/refreshtoken', [
    validateFields
], refreshToken);

router.post('/forgotpassword', forgotPassword);
router.route('/forgotpassword/:token').get(verifiedToken).post(newPassword);
// router.get('/forgotpassword/:token', verifiedToken);
// router.post('/forgotpassword/:token', newPassword);





module.exports = router;