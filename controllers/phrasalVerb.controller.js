const { response } = require('express');

const PhrasalVerb = require('../models/phrasalVerb');


const phrasalVerbGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, phrasalVerbs ] = await Promise.all([
        phrasalVerb.countDocuments(query),
        phrasalVerb.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        phrasalVerbs
    });
}

phrasalVerbGetById = async( req, res = response ) => {

    const { id } = req.params;

    const phrasalVerb = await phrasalVerb.findById(id);

    res.json({
        phrasalVerb,
    })
}


const phrasalVerbPost = async( req, res = response ) => {

    const { phrasalVerb } = req.body;

    const data = {
        phrasalVerb,
        user: req.user._id
    }

    const phrasalV = new PhrasalVerb(data);
    await phrasalV.save();

    res.json({
        phrasalV
    });
}

const phrasalVerbPut = async( req, res = response ) => {

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


    const phrasalVerb = await phrasalVerb.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        phrasalVerb
    })
  
}

const phrasalVerbDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const phrasalVerb = await phrasalVerb.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        phrasalVerb
    })

    
}

module.exports = {
    phrasalVerbGet,
    phrasalVerbGetById,
    phrasalVerbPost,
    phrasalVerbPut,
    phrasalVerbDelete
}