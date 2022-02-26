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
    const user = req.user._id;
    const { term } = req.params;

    const regex = new RegExp( term, "i" );

    const [ verbs, adjectives, phrasalverbs, prepositions, connectors ] = await Promise.all([
        Verb.find({
            $or: [{ baseForm: regex }],
            $and: [{ status: true, user }]
        }),
        Adjective.find({
            $or: [{ adjective: regex }],
            $and: [{ status: true, user }]
        }),
        PhrasalVerb.find({
            $or: [{ phrasalVerb: regex }],
            $and: [{ status: true, user }]
        }),
        Preposition.find({
            $or: [{ preposition: regex }],
            $and: [{ status: true, user }]
        }),
        Connector.find({
            $or: [{ connector: regex }],
            $and: [{ status: true, user }]
        })
    ]);

    res.json({
        verbs,
        adjectives,
        phrasalverbs,
        prepositions,
        connectors
    })
}

const filter = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const user = req.user._id;
    const query = { user, status: true };


    const { collection, field, value } = req.params;

    if ( !allowCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `Allow collection are ${ allowCollections }`
        })
    }

    switch ( collection ) {
        case 'verbs':

            const [ total, verbs ] = await Promise.all([
                Verb.countDocuments(query).where( field, value ),
                Verb.find(query).where( field, value )
                       .skip(Number(from))
                       .limit(Number(limit))
            ]);

             return res.json({
                total,
                results: ( verbs ) ?  verbs  : []
            });

        case 'adjectives': 
            const adjective = await Adjective.find({ status: true, user }).where( field, value );
             return res.json({
                results: ( adjective ) ?  adjective  : []
            });
        case 'phrasalverbs':
            const phrasalVerbs = await phrasalVerb.find({ status: true, user }).where( field, value );
             return res.json({
                results: ( phrasalVerbs ) ?  phrasalVerbs : []
            });
        case 'prepositions': 
            const prepositions = await Preposition.find({ status: true, user }).where( field, value );
             return res.json({
                results: ( prepositions ) ?  prepositions  : []
            });
        case 'connectors': 
            const connectors = await Connector.find({ status: true, user }).where( field, value );
             return res.json({
                results: ( connectors ) ? connectors  : []
             });
        default:
            break;
    }
}


const filterByDate = async( req, res = response ) => {

    const user = req.user._id;
    const { startDate, endDate } = req.body;
    
    const [ verbs, adjectives, phrasalverbs, prepositions, connectors ] = await Promise.all([
        Verb.find({
                status: true,
                user,
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }}),
        Adjective.find({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }}),
        PhrasalVerb.find({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }}),
        Preposition.find({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }}),
        Connector.find({
            status: true,
             user,
             createdAt: {
                $gte: startDate,
                $lt: endDate
             }})
    ]);


    res.json({
        verbs,
        adjectives,
        phrasalverbs,
        prepositions,
        connectors
    })

    
}


const countRegisterByDates = async ( req, res = response ) => {

    const user = req.user._id;
    const { startDate, endDate } = req.body;


    const [ verbsTotal, adjectivesTotal, phrasalverbsTotal, prepositionsTotal, connectorsTotal ] = await Promise.all([
        Verb.countDocuments({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
             }
             }),
        Adjective.countDocuments({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
             }
            }),
        PhrasalVerb.countDocuments({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
             }
             }),
        Preposition.countDocuments({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
             }
             }),
        Connector.countDocuments({
            status: true,
            user,
            createdAt: {
                $gte: startDate,
                $lt: endDate
             }
             }),
    ]);

    res.json({
        verbsTotal,
        adjectivesTotal,
        phrasalverbsTotal,
        prepositionsTotal,
        connectorsTotal
    })
}

const countRegister = async ( req, res = response ) => {

    const user = req.user._id;

    const [ verbsTotal, adjectivesTotal, phrasalverbsTotal, prepositionsTotal, connectorsTotal ] = await Promise.all([
        Verb.countDocuments({ status: true, user }),
        Adjective.countDocuments({ status: true, user}),
        PhrasalVerb.countDocuments({ status: true, user }),
        Preposition.countDocuments({ status: true, user }),
        Connector.countDocuments({ status: true, user }),
    ]);

    res.json({
        verbsTotal,
        adjectivesTotal,
        phrasalverbsTotal,
        prepositionsTotal,
        connectorsTotal
    })
}


const search = ( req, res = response ) => {
    
    const { limit = 5, from = 0 } = req.query;
    const user = req.user._id;
    const query = { user, status: true };


    const { collection, term } = req.params;

    data = {
        term,
        query,
        limit,
        from
    }

    if ( !allowCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `Allow collection are ${ allowCollections }`
        })
    }

    switch ( collection ) {
        case 'verbs':
            // searchVerbs( term, user, query, res );
            searchVerbs( data, res );
            break;
        case 'adjectives':
            searchAdjectives( data, res );
            break;
        case 'phrasalverbs':
            searchPhrasalVerbs( data, res );
            break;
        case 'prepositions':
            searchPrepositions( data, res );
            break;
        case 'connectors':
            searchConnectors( data, res );
            break;        
        default:
            break;
    }

}


const searchVerbs = async( data, res = response ) => {
    
    const { term, query, limit, from } = data;

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const verbs = await Verb.findById( term );
        
        return res.json({
            results: ( verbs ) ? [ verbs ] : []
        });

    }

    const regex = new RegExp( term, 'i');


    const [ total, verbs ] = await Promise.all([
        Verb.countDocuments({
            $or: [ { baseForm: regex },
                   { pastSimple: regex },
                   { pastParticiple: regex },
                   { type: regex },
                   { nik: regex }],
            $and: [query]
        }),
        Verb.find({
            $or: [ { baseForm: regex },
                   { pastSimple: regex },
                   { pastParticiple: regex },
                   { type: regex },
                   { nik: regex }],
            $and: [query]
        }).skip(Number(from))
          .limit(Number(limit))
    ]);
    

   
    res.json({
        total,
        results: verbs
    });
}

const searchAdjectives = async( data, res = response ) => {
    
    const { term, query, limit, from } = data;
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const adjectives = await Adjective.findById( term );
        
        return res.json({
            results: ( adjectives ) ? [ adjectives ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const [ total, adjectives ] = await Promise.all([
        Adjective.countDocuments({
            $or: [{ adjective: regex }],
            $and: [query]
        }),
        Adjective.find({
            $or: [{ adjective: regex }],
            $and: [query]
        }).skip(Number(from))
          .limit(Number(limit))
    ]);

    res.json({
        total,
        results: adjectives
    });
}

const searchPhrasalVerbs = async( data, res = response ) => {

    const { term, query, limit, from } = data;
    
    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const phrasalVerb = await PhrasalVerb.findById( term );
        
        return res.json({
            results: ( phrasalVerb ) ? [ phrasalVerb ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const [ total, phrasalverbs ] = await Promise.all([
        PhrasalVerb.countDocuments({
            $or: [{ phrasalVerb: regex }],
            $and: [query]
        }),
        PhrasalVerb.find({
            $or: [{ phrasalVerb: regex }],
            $and: [query]
        }).skip(Number(from))
          .limit(Number(limit))
    ]);

    res.json({
        total,
        results: phrasalverbs
    });
}

const searchPrepositions = async( data, res = response ) => {
    
    const { term, query, limit, from } = data;

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const prepositions = await Preposition.findById( term );
        
        return res.json({
            results: ( prepositions ) ? [ prepositions ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const [ total, prepositions ] = await Promise.all([
        Preposition.countDocuments({
            $or: [{ preposition: regex }],
            $and: [query]
        }),
        Preposition.find({
            $or: [{ preposition: regex }],
            $and: [query]
        }).skip(Number(from))
          .limit(Number(limit))
    ]);



    res.json({
        total,
        results: prepositions
    });
}

const searchConnectors = async( data, res = response ) => {
    
    const { term, query, limit, from } = data;

    const isMongoId = ObjectId.isValid( term );
    
    if ( isMongoId ) {
        
        const connector = await Connector.findById( term );
        
        return res.json({
            results: ( connector ) ? [ connector ] : []
        });

    }

    const regex = new RegExp( term, 'i');

    const [ total, connectors ] = await Promise.all([
        Connector.countDocuments({
            $or: [{ connector: regex } ],
            $and: [query]
        }),
        Connector.find({
            $or: [{ connector: regex } ],
            $and: [query]
        }).skip(Number(from))
          .limit(Number(limit))
    ]);


    

    res.json({
        total,
        results: connectors
    });
}


module.exports = {
    searchAll,
    search,
    filter,
    filterByDate,
    countRegister,
    countRegisterByDates
}