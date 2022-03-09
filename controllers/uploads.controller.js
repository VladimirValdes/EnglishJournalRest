const path = require('path');
const fs = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');
const { User } = require('../models');


const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);



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

const updateImageCloudinary = async( req, res = response ) => {

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
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length -1 ];
        const [ public_id ] = name.split('.');
    
        // Eliminandola de cloudinary
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath ); // extrayendo de la res de cloudinary el secure_url
    model.img = secure_url;
  
    await model.save();



    res.json(model)
    
}

const showImage = async( req, res = response ) => {

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



    if( model.img ) {
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImagen )) {
           return  res.sendFile(pathImagen);
        }
    }

   

    const pathNoImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImg);
    
}



module.exports = {
    loadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}
