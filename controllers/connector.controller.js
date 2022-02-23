const { response } = require('express');

const Connector = require('../models/connectors');


const connectorGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, connectors ] = await Promise.all([
        Connector.countDocuments(query),
        Connector.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        connectors
    });
}

const connectorGetById = async( req, res = response ) => {

    const { id } = req.params;

    const connector = await Connector.findById(id);

    res.json({
        connector,
    })
}

const connectorsGetByUser = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const user = req.user._id;   

    const query = { user, status: true };

    const [ total, connectors ] = await Promise.all([
        Connector.countDocuments(query),
        Connector.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);

    res.json({
        total,
        connectors
    });
}


const connectorPost = async( req, res = response ) => {

    const { connector } = req.body;

    const data = {
        connector,
        user: req.user._id
    }

    const connec = new Connector(data);
    await connec.save();

    res.json({
        connec
    });
}

const connectorPut = async( req, res = response ) => {

    const { id } = req.params;
    const { id_, connector } = req.body;

    const data = {
        connector,
        user: req.user._id
    }


    const connec = await Connector.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        connec
    })
  
}

const connectorDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const connec = await Connector.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        connec
    })

    
}

module.exports = {
    connectorGet,
    connectorGetById,
    connectorsGetByUser,
    connectorPost,
    connectorPut,
    connectorDelete
}