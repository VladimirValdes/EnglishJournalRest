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

// Verbs Validations

// const verbExists = async( req = request, baseForm = '' ) => {
//     const user = req.user._id;
//     const { pastSimple, pastParticiple } = req.body;
    
//     const existVerb = await Verb.findOne({
//         $or: [{ baseForm }, {  pastSimple }, { pastParticiple }],
//         $and:[{ user }, { status: true }]

//     });

//     if ( existVerb ) { 
//         throw new Error(`Verb  has already been register in DB`)
//     } 



// }


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
    

    // You need to check by field like getVerbs 


    // if () {
        
    // }
    
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

const phrasalVerbExists = async( phrasalVerb = '') => {
    const existphrasalV = await PhrasalVerb.findOne({ phrasalVerb });

    if ( existphrasalV ) { 
        throw new Error(`Phrasal verb :  ${ existphrasalV.phrasalVerb } has already been register in DB`)}
}

const phrasalVerbExitsById = async( id ) => {

    const phrasalVerbExist = await PhrasalVerb.findById(id);

    if ( !phrasalVerbExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

// Adjective

const adjectiveExists = async( adjective = '') => {
    const existsAdj = await Adjective.findOne({ adjective });

    if ( existsAdj ) { 
        throw new Error(`Adjective :  ${ existsAdj.adjective } has already been register in DB`)}
}

const adjectiveExitsById = async( id ) => {

    const adjectiveExist = await Adjective.findById(id);

    if ( !adjectiveExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

// Propostions


const prepositionExists = async( preposition = '') => {
    const existsPrep = await Preposition.findOne({ preposition });

    if ( existsPrep ) { 
        throw new Error(`preposition :  ${ existsPrep.preposition } has already been register in DB`)}
}

const prepositionExitsById = async( id ) => {

    const prepositionExist = await Preposition.findById(id);

    if ( !prepositionExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}


// Connectors


const connectorExists = async( connector = '') => {
    const existsConnec = await Connector.findOne({ connector });

    if ( existsConnec ) { 
        throw new Error(`connector :  ${ existsConnec.connector } has already been register in DB`)}
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
