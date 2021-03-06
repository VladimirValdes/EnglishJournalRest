const { response } = require('express');

const Adjective = require('../models/adjectives');


const adjectiveGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, adjectives ] = await Promise.all([
        Adjective.countDocuments(query),
        Adjective.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        adjectives
    });
}

const adjectiveGetById = async( req, res = response ) => {

    const { id } = req.params;

    const adjective = await Adjective.findById(id);

    res.json({
        adjective,
    })
}


const adjectiveGetByUser = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const user = req.user._id;   

    const query = { user, status: true };

    const [ total, adjectives ] = await Promise.all([
        Adjective.countDocuments(query),
        Adjective.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);

    res.json({
        total,
        adjectives
    });
}

const adjectivePost = async( req, res = response ) => {

    const { adjective } = req.body;

    const data = {
        adjective,
        user: req.user._id
    }

    const adj = new Adjective(data);
    await adj.save();

    res.json({
        adj
    });
}

const adjectivePut = async( req, res = response ) => {

    const { id } = req.params;
    const { id_, adjective } = req.body;

    const data = {
        adjective,
        user: req.user._id
    }


    const adj = await Adjective.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        adj
    })
  
}

const adjectiveDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const adj = await Adjective.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        adj
    })

    
}

module.exports = {
    adjectiveGet,
    adjectiveGetById,
    adjectiveGetByUser,
    adjectivePost,
    adjectivePut,
    adjectiveDelete
}