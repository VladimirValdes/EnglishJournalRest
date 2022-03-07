const { response, request } = require('express');


const {
    Role,
    User,
    Verb,
    PhrasalVerb,
    Adjective,
    Preposition,
    Connector
} = require('../models/index')


const isRoleValido = async( role = '') => {

    const existRol = await Role.findOne({ role });

    if ( !existRol ) {
        throw new Error(` This Rol  ${ role } doesn't exist in the DB`);
    }
}


const emailExist = async( email = '' ) => {
    
    const existEmail = await User.findOne({ email });

    if ( existEmail ) {
        
      throw new Error(`Email ${ existEmail.email } has already been register in DB`);
    }
}



const userExitsById = async( id ) => {

    const idExist = await User.findById(id);

    if ( !idExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}


const verbExists = async( req = request, res =  response , next) => {
    const user = req.user._id;
    const { baseForm, pastSimple, pastParticiple } = req.body;
    
    const existVerb = await Verb.findOne({
        $or: [{ baseForm }, {  pastSimple }, { pastParticiple }],
        $and:[{ user }, { status: true }]
    });

    if ( existVerb ) { 
        return res.status(400).json({
            error: 'Verb has already been register in DB'
        })
    } 
    next();

}

const isNotSameVerb = async( req= request, res = response, next ) => {
    const user = req.user._id;
    const { id } = req.params;
    const { baseForm, pastSimple, pastParticiple } = req.body;
    
    const [ existBaseForm, existPastSimple, existPastParticiple ] = await Promise.all([
        Verb.findOne({
            $or: [{ baseForm }, { pastSimple: baseForm }, { pastParticiple: baseForm }],
            $and:[{ user }, { status: true }]
        }),
        Verb.findOne({
            $or: [{ baseForm: pastSimple }, { pastSimple }, { pastParticiple: pastSimple }],
            $and:[{ user }, { status: true }]
        }),
        Verb.findOne({
            $or: [{ baseForm: pastParticiple }, { pastSimple: pastParticiple }, { pastParticiple }],
            $and:[{ user }, { status: true }]
        }),
    ]);


    if ( existBaseForm && id != existBaseForm._id ) {
        return res.status(400).json({ error: 'Verb has already been register in DB' });
    } else if( existPastSimple && id != existPastSimple._id ){
        return res.status(400).json({ error: 'Verb has already been register in DB' });
    } else if (existPastParticiple && id != existPastParticiple._id ) {
     
        return res.status(400).json({ error: 'Verb has already been register in DB' });
        
    }
    next();
}

const verbExitsById = async( id ) => {

    const verbExist = await Verb.findById(id);

    if ( !verbExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

// Phrasal Verb

const phrasalVerbExists = async( req = request, res =  response , next) => {
    const user = req.user._id;
    const { phrasalVerb } = req.body;
    
    const existPhrasalVerb = await PhrasalVerb.findOne({ user, status: true, phrasalVerb });

    if ( existPhrasalVerb ) { 
        return res.status(400).json({
            error: 'Phrasal Verb has already been register in DB'
        })
    } 

    next();

}



const phrasalVerbExitsById = async( id ) => {

    const phrasalVerbExist = await PhrasalVerb.findById(id);

    if ( !phrasalVerbExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

// Adjective

const adjectiveExists = async( req = request, res =  response , next) => {
    const user = req.user._id;
    const { adjective } = req.body;
    
    const existsAdj = await Adjective.findOne({ user, status: true, adjective });

    if ( existsAdj ) { 
        return res.status(400).json({
            error: 'Adjective has already been register in DB'
        })
    } 

    next();

}



const adjectiveExitsById = async( id ) => {

    const adjectiveExist = await Adjective.findById(id);

    if ( !adjectiveExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

// Propostions

const prepositionExists = async( req = request, res =  response , next) => {
    const user = req.user._id;
    const { preposition } = req.body;
    
    const existsPrep = await Preposition.findOne({ user, status: true, preposition });

    if ( existsPrep ) { 
        return res.status(400).json({
            error: 'Preposition has already been register in DB'
        })
    } 

    next();

}




const prepositionExitsById = async( id ) => {

    const prepositionExist = await Preposition.findById(id);

    if ( !prepositionExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}


// Connectors

const connectorExists = async( req = request, res =  response , next) => {
    const user = req.user._id;
    const { connector } = req.body;
    
    const existsConnec = await Connector.findOne({ user, status: true, connector });

    if ( existsConnec ) { 
        return res.status(400).json({
            error: 'Connector has already been register in DB'
        })
    } 

    next();

}




const connectorExitsById = async( id ) => {

    const connectorExist = await Connector.findById(id);

    if ( !connectorExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}



module.exports = {
    isRoleValido,
    emailExist,
    userExitsById,
    verbExists,
    isNotSameVerb,
    verbExitsById,
    phrasalVerbExists,
    phrasalVerbExitsById,
    adjectiveExists,
    adjectiveExitsById,
    prepositionExists,
    prepositionExitsById,
    connectorExists,
    connectorExitsById

}
