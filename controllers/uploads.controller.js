const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../helpers/uploadFile');
const { User } = require('../models');




const loadFile = async( req, res = response ) => {



    try {
        const name = await uploadFile( req.files, ['txt', 'md'] );

        res.json({
            name
        });
    } catch (msg) {
        res.status(400).json({msg});
    }

}

const updateImage = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if ( !model ) {
                return res.status(400).json({ msg: 'Id doesnt exist '});
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: ' This collection doesnt exist '})
    }


     // Limpiar imagenes previas 

    if( model.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImagen )) {
            fs.unlinkSync( pathImagen ); // Nos permite borrar la imagen
        }
    }

    const img = await uploadFile( req.files, undefined, collection);
    model.img = img;

    await model.save();


    res.json(model)
    
}



module.exports = {
    loadFile,
    updateImage
}
