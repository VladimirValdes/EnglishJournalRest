const Role = require('../models/role');
const User = require('../models/users');


const isRoleValido = async( role = '') => {

    const existRol = await Role.findOne({ role });

    if ( !existRol ) {
        throw new Error(` This Rol  ${ role } doesn't exist in the DB`);
    }
}


const emailExist = async( email = '' ) => {
    
    const existEmail = await User.findOne({ email });

    if ( existEmail ) {
        
      throw new Error(`Email ${ email } has already been register in DB`);
    }
}



const userExitsById = async( id ) => {

    const idExist = await User.findById(id);

    if ( !idExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}


module.exports = {
    isRoleValido,
    emailExist,
    userExitsById
}
