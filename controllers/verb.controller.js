const { response } = require('express');

const Verb = require('../models/verbs');


const verbGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, verbs ] = await Promise.all([
        Verb.countDocuments(query),
        Verb.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        verbs
    });
}

verbGetById = async( req, res = response ) => {

    const { id } = req.params;

    const verb = await Verb.findById(id);

    res.json({
        verb,
    })
}

verbGetByUser = async( req, res = response ) => {
    const user = req.user._id;

    const verbs = await Verb.find({ user, status: true });

    res.json({
        verbs
    });
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
    const { id_, baseForm, pastSimple, pastParticiple, type, nik } = req.body;

    const data = {
        baseForm,
        pastSimple,
        pastParticiple,
        type,
        nik,
        user: req.user._id
    }


    const verb = await Verb.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        verb
    })
  
}

const verbDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const verb = await Verb.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        verb
    })

    
}

module.exports = {
    verbGet,
    verbGetById,
    verbGetByUser,
    verbPost,
    verbPut,
    verbDelete
}