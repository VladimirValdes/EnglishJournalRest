const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Verb = require('../models/verbs');


const verbGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        users
    });
}

verbGetById = async( req, res = response ) => {

    const { id } = req.params;

    const user = await User.findById( id );

    res.json({
        user,
    })
}


const verbPost = async( req, res = response ) => {

    const { baseForm, pastSimple, pastParticiple, type, nik } = req.body;

    const data = {
        baseForm,
        pastSimple,
        pastParticiple,
        type,
        nik,
        user: req.user._id
    }

    const verb = new Verb(data);
    await verb.save();

    res.json({
        verb
    });
}

const verbPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();

        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        user
    })
  
}

const verbDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const user = await User.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        user
    })

    
}

module.exports = {
    verbGet,
    verbGetById,
    verbPost,
    verbPut,
    verbDelete
}