const { response } = require('express');

const PhrasalVerb = require('../models/phrasalVerb');


const phrasalVerbGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, phrasalVerbs ] = await Promise.all([
        PhrasalVerb.countDocuments(query),
        PhrasalVerb.find(query)
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

    const phrasalVerb = await PhrasalVerb.findById(id);

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
    const { id_, phrasalVerb } = req.body;

    const data = {
        phrasalVerb,
        user: req.user._id
    }


    const phrasalV = await PhrasalVerb.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        phrasalV
    })
  
}

const phrasalVerbDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const phrasalV = await PhrasalVerb.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        phrasalV
    })

    
}

module.exports = {
    phrasalVerbGet,
    phrasalVerbGetById,
    phrasalVerbPost,
    phrasalVerbPut,
    phrasalVerbDelete
}