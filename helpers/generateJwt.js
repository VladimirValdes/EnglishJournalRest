const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject('Token does not generate');
            } else  {
                resolve( token );
            }
        })
    })
}


const generateRefreshJWT = ( uid = '' ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.REFRESHTOKENKEY, {
            expiresIn: '90d'
        }, ( err, refreshToken ) => {

            if ( err ) {
                console.log(err);
                reject('Token does not generate');
            } else  {
                resolve( refreshToken );
            }
        })
    })
}


module.exports = {
    generateJWT,
    generateRefreshJWT
}