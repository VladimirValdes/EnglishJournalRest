
const validateFields = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt');

module.exports = {
    ...validateFields,
    ...validateJwt
}