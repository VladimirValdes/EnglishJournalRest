
const validateFiledUpload = require('../middlewares/validateFile');
const validateFields = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt');
const validateRefreshJWT = require('../middlewares/validateJwt');


module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRefreshJWT,
    ...validateFiledUpload
}