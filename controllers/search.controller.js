const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {
    User,
    Verb,
    Adjective,
    PhrasalVerb,
    Preposition,
    Connector
} = require('../models/index');

const allowCollections = [
    "users",
    "verbs",
    "adjectives",
    "phrasalverbs",
    "prepositions",
    "connectors"
];


const searchAll = async( req, res = response ) => {
    
    const { term } = req.params;

    const regex = new RegExp( term, "i" );

    const [ users, verbs, adjectives, phrasalverbs, prepositions, connectors ] = await Promise.all([
        User.find({
            $or: [{ name: regex }],
            $and: [{ status: true }]
        }),
        Verb.find({
            $or: [{ baseForm: regex }],
            $and: [{ status: true }]
        }),
        Adjective.find({
            $or: [{ adjective: regex }],
            $and: [{ status: true }]
        }),
        PhrasalVerb.find({
            $or: [{ phrasalVerb: regex }],
            $and: [{ status: true }]
        }),
        Preposition.find({
            $or: [{ preposition: regex }],
            $and: [{ status: true }]
        }),
        Connector.find({
            $or: [{ connector: regex }],
            $and: [{ status: true }]
        })
    ]);

    res.json({
        users,
        verbs,
        adjectives,
        phrasalverbs,
        prepositions,
        connectors
    })
}


module.exports = {
    searchAll
}