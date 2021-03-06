
const path = require('path');
const fs   = require('fs');
const pdf = require('html-pdf');


const { response } = require('express');

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
    const user = req.user._id;
    const { collection, field, value } = req.params;


    const searchP = {
        field,
        value,
        user
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

    const { field, value, user } = searchParams;

    const verbs = await Verb.find({ status: true, user }).where( field, value );

    const data = {
        verbs: JSON.parse(JSON.stringify(verbs))
    }

    const html = renderTemplate('./templates/verbsTemplate.html', data );


    pdf.create(html).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err)
          return res.sendStatus(500)
        } else {
          // send a status code of 200 OK
          res.statusCode = 200             
          res.contentType("application/pdf");
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })

   
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

    const { field, value, user } = searchParams;

    const adjectives = await Adjective.find({ status: true, user, field });

    const data = {
        adjectives: JSON.parse(JSON.stringify(adjectives))
    }

    const html = renderTemplate('./templates/adjectivesTemplate.html', data );

    pdf.create(html).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err)
          return res.status(400).json({
              msg: 'Pdf error, we could not created it'
          })
        } else {
          // send a status code of 200 OK
          res.statusCode = 200             
          res.contentType("application/pdf");
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })

    
}


const phrasalVFilter = async( searchParams, res ) => {

    const { field, user } = searchParams;

    const phrasalV = await PhrasalVerb.find({ status: true, user, field });

    const data = {
        phrasalV: JSON.parse(JSON.stringify(phrasalV))
    }

    const html = renderTemplate('./templates/phrasalVTemplate.html', data );

    pdf.create(html).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err)
          return res.status(400).json({
              msg: 'Pdf error, we could not created it'
          })
        } else {
          // send a status code of 200 OK
          res.statusCode = 200             
          res.contentType("application/pdf");
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })
}



const prepositionFilter = async( searchParams, res ) => {

    const { field, value, user } = searchParams;

    const prepositions = await Preposition.find({ status: true, user, field })

    const data = {
        prepositions: JSON.parse(JSON.stringify(prepositions))
    }

    const html = renderTemplate('./templates/prepositionsTemplate.html', data );

    pdf.create(html).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err)
          return res.status(400).json({
              msg: 'Pdf error, we could not created it'
          })
        } else {
          // send a status code of 200 OK
          res.statusCode = 200             
          res.contentType("application/pdf");
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })
}


const connectorsFilter = async( searchParams, res ) => {

    const { field, value, user } = searchParams;

    const connectors = await Connector.find({ status: true, field, user });

    const data = {
        connectors: JSON.parse(JSON.stringify(connectors))
    }

    const html = renderTemplate('./templates/connectorsTemplate.html', data );

    pdf.create(html).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err)
          return res.status(400).json({
              msg: 'Pdf error, we could not created it'
          })
        } else {
          // send a status code of 200 OK
          res.statusCode = 200             
          res.contentType("application/pdf");
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })
}




module.exports = {
    filter
}