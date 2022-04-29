const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');
const { generateJWT, generateRefreshJWT } = require('../helpers/generateJwt');
const generateId = require('../helpers/generateId');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Check if email exists
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - correo'
            });
        }

        // If user is not active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User / Password  are not correct - estado: false'
            })
        }

        // Check password

        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        } 

        // Check  verified account

        // if( !user.verified ) {
        //     return res.status(400).json({
        //         msg: 'User - verified: false'
        //     })
        // }

        // Generar  el JWT
        const token = await generateJWT( user.id );
        const refreshToken = await generateRefreshJWT( user.id )


        res.json({
            user,
            token,
            refreshToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    
}


const renewToken = async( req, res = response ) => {

    const uid = req.user._id;

     // generate Token
     const token = await generateJWT( uid );
     const refreshToken = await generateRefreshJWT(uid);


     // Get User
    const user = await User.findById(uid);

     res.json({
        token,
        refreshToken,
        user,
        // menu: getMenuFrontEnd( user.rol )
        
     })
}


const refreshToken = async( req, res = response ) => {

    const uid = req.user._id;

     // generate Token
     const token = await generateJWT( uid );
     const refreshToken = await generateRefreshJWT(uid);

     // Get User
    // const user = await User.findById(uid);

     res.json({
        token,
        refreshToken
        // user,
        // menu: getMenuFrontEnd( user.rol )
        
     })
}

const verified = async( req, res = response ) => {
    const { token } = req.params;

    const data = {
        token: null,
        verified: true
    }

    
    const userVerified = await User.findOneAndUpdate({ token }, data, { new: true });
     

    res.json({
        userVerified,
        msg: 'User verified'
    })
}


const forgotPassword = async( req, res = response ) => {

    const { email } = req.body;

    const userExist =  await User.findOne({ email, status: true });

    if (! userExist ) {
        return res.status(400).json({
            msg: 'User doesnt exist - email'
        });
    }

    try {

        userExist.token = generateId();
        // userExist.verified = false;

        await userExist.save();

        res.json({
            msg: 'We have just sent an email with the instructions'
        })
        
    } catch (error) {
        console.log(error)
    }


    res.json({
        msg: 'forgot Password'
    })
}

const verifiedToken = async( req, res = response ) => {

    const { token } = req.params;

    const validToken = await User.findOne({ token });

    console.log({ validToken });

    if ( validToken ) {
        res.json({ msg: 'valid token and user exists'})
    } else {
        res.status(400).json({
            msg: 'Token invalid - user doesnt exist'
        });
    }

   
}

const newPassword = async( req, res = response ) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token, status: true  });

    if ( !user ) {
        return res.status(400).json({
            msg: 'User doesnt exist'
        });
    }

    try {

        user.token = null;
        
        // password encrypt
        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);

        await user.save();



    // saved in DB

        res.json({
            msg: 'Password mofified'
        });

    } catch (error) {
        console.log(error);
    }
    
}



module.exports = {
    login,
    renewToken,
    refreshToken,
    verified,
    forgotPassword,
    verifiedToken,
    newPassword
}