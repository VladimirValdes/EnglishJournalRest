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

const search = ( req, res = response ) => {
    
    const { collection, term } = req.params;

    if ( !allowCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `Allow collection are ${ allowCollections }`
        })
    }

    switch ( collection ) {
        case 'users':
            searchUsers( term, res );
            break;
        case 'verbs':
            searchVerbs( term, res );
            break;
        case 'adjectives':
            searchAdjectives( term, res );
            break;
        case 'phrasalverbs':
            searchPhrasalVerbs( term, res );
            break;
        case 'prepositions':
            searchPrepositions( term, res );
            break;
        case 'connectors':
            searchConnectors( term, res );
            break;        
        default:
            break;
    }

}

const searchUsers = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const users = await User.findById( term );
        
        return res.json({
            results: ( users ) ? [ users ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const user = await User.find({
                            $or: [{ name: regex }, { email: regex }],
                            $and: [{ status: true }]
                        });

    res.json({
        results: user
    });
}


const searchVerbs = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const verbs = await Verb.findById( term );
        
        return res.json({
            results: ( verbs ) ? [ verbs ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const verb = await Verb.find({
                            $or: [ { baseForm: regex },
                                   { pastSimple: regex },
                                   { pastParticiple: regex },
                                   { type: regex },
                                   { nik: regex }],
                            $and: [{ status: true }]
                        });

    res.json({
        results: verb
    });
}

const searchAdjectives = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const adjectives = await Adjective.findById( term );
        
        return res.json({
            results: ( adjectives ) ? [ adjectives ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const adjective = await Adjective.find({
                            $or: [{ adjective: regex } ],
                            $and: [{ status: true }]
                        });

    res.json({
        results: adjective
    });
}

const searchPhrasalVerbs = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const phrasalVerb = await PhrasalVerb.findById( term );
        
        return res.json({
            results: ( phrasalVerb ) ? [ phrasalVerb ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const phrasalV = await PhrasalVerb.find({
                            $or: [{ phrasalVerb: regex } ],
                            $and: [{ status: true }]
                        });

    res.json({
        results: phrasalV
    });
}

const searchPrepositions = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const prepositions = await Preposition.findById( term );
        
        return res.json({
            results: ( prepositions ) ? [ prepositions ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const prepositions = await Preposition.find({
                            $or: [{ preposition: regex } ],
                            $and: [{ status: true }]
                        });

    res.json({
        results: prepositions
    });
}

const searchConnectors = async( term, res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const connector = await Connector.findById( term );
        
        return res.json({
            results: ( connector ) ? [ connector ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const connectors = await Connector.find({
                            $or: [{ connector: regex } ],
                            $and: [{ status: true }]
                        });

    res.json({
        results: connectors
    });
}


module.exports = {
    searchAll,
    search
}