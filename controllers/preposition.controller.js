const { response } = require('express');

const Preposition = require('../models/preposition');


const prepositionGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, prepositions ] = await Promise.all([
        Preposition.countDocuments(query),
        Preposition.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        prepositions
    });
}

prepositionGetById = async( req, res = response ) => {

    const { id } = req.params;

    const preposition = await Preposition.findById(id);

    res.json({
        preposition,
    })
}


const prepositionPost = async( req, res = response ) => {

    const { preposition } = req.body;

    const data = {
        preposition,
        user: req.user._id
    }

    const prep = new Preposition(data);
    await prep.save();

    res.json({
        prep
    });
}

const prepositionPut = async( req, res = response ) => {

    const { id } = req.params;
    const { id_, preposition } = req.body;

    const data = {
        preposition,
        user: req.user._id
    }


    const prep = await Preposition.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        prep
    })
  
}

const prepositionDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const prep = await Preposition.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        prep
    })

    
}

module.exports = {
    prepositionGet,
    prepositionGetById,
    prepositionPost,
    prepositionPut,
    prepositionDelete
}