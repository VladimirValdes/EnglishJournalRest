const { response } = require('express');

const Preposition = require('../models/preposition');


const prepositionGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, prepositions ] = await Promise.all([
        preposition.countDocuments(query),
        preposition.find(query)
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

    const preposition = await preposition.findById(id);

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


    const adj = await preposition.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        adj
    })
  
}

const prepositionDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const adj = await preposition.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        adj
    })

    
}

module.exports = {
    prepositionGet,
    prepositionGetById,
    prepositionPost,
    prepositionPut,
    prepositionDelete
}