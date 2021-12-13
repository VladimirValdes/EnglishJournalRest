// const Role = require('../models/role');
// const User = require('../models/users');

const {
    Role,
    User,
    Verb
} = require('../models/index')


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


const verbExists = async( baseForm = '') => {
    const existVerb = await Verb.findOne({ baseForm });

    if ( existVerb ) { 
        console.log('verb already exist')
        throw new Error(`Verb ${ existVerb.baseForm } has already been register in DB`)}
}


module.exports = {
    isRoleValido,
    emailExist,
    userExitsById,
    verbExists
}
