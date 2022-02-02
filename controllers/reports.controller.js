const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { generatePdf, renderTemplate } = require('../helpers/generatePdf');

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




const filter = async( req, res = response ) => {
    const { collection, field, value } = req.params;


    const searchP = {
        field,
        value,
    }


    if ( !allowCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `Allow collection are ${ allowCollections }`
        })
    }

  

    switch ( collection ) {
        case 'verbs':
            verbsFilter( searchP, res );
        break;
        case 'users':
            userFilter( searchP, res );
        break;
        case 'adjectives': 
            adjectivesFilter( searchP, res );
        break;
        case 'phrasalverbs':
            phrasalVFilter( searchP, res );
        break;
        case 'prepositions': 
            prepositionFilter( searchP, res );
        break;
        case 'connectors': 
            connectorsFilter( searchP, res );
        break;
        default:
            break;
    }
}


const verbsFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const verbs = await Verb.find({ status: true }).where( field, value );

    const data = {
        verbs: JSON.parse(JSON.stringify(verbs))
    }

    const html = renderTemplate('./templates/verbsTemplate.html', data );

    generatePdf(html);

    return res.json({
       results: ( verbs ) ?  verbs  : []
   });
}



const userFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const users = await User.find({ status: true }).where( field, value );

    const data = {
        users: JSON.parse(JSON.stringify(users))
    }

    // const html = renderTemplate('./templates/verbsTemplate.html', data );

    // generatePdf(html);

    return res.json({
       results: ( users ) ?  users  : []
   });
}


const adjectivesFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const adjectives = await Adjective.find({ status: true }).where( field, value );

    const data = {
        adjectives: JSON.parse(JSON.stringify(adjectives))
    }

    // const html = renderTemplate('./templates/verbsTemplate.html', data );

    // generatePdf(html);

    return res.json({
       results: ( adjectives ) ?  adjectives  : []
   });
}


const phrasalVFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const phrasalV = await PhrasalVerb.find({ status: true }).where( field, value );

    const data = {
        phrasalV: JSON.parse(JSON.stringify(phrasalV))
    }

    // const html = renderTemplate('./templates/verbsTemplate.html', data );

    // generatePdf(html);

    return res.json({
       results: ( phrasalV ) ?  phrasalV  : []
   });
}



const prepositionFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const prepositions = await Preposition.find({ status: true }).where( field, value );

    const data = {
        prepositions: JSON.parse(JSON.stringify(prepositions))
    }

    // const html = renderTemplate('./templates/verbsTemplate.html', data );

    // generatePdf(html);

    return res.json({
       results: ( prepositions ) ?  prepositions  : []
   });
}


const connectorsFilter = async( searchParams, res ) => {

    const { field, value } = searchParams;

    const connectors = await Connector.find({ status: true }).where( field, value );

    const data = {
        connectors: JSON.parse(JSON.stringify(connectors))
    }

    // const html = renderTemplate('./templates/verbsTemplate.html', data );

    // generatePdf(html);

    return res.json({
       results: ( connectors ) ?  connectors  : []
   });
}




module.exports = {
    filter
}