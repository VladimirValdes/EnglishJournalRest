const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = ( files, allowExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise( ( resolve, reject ) => {
        

        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        const tempName = uuidv4() + '.' + extension;

        // Validate extensiones
        // const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

        if ( !allowExtensions.includes( extension )) {
            return  reject(` The extension ${ extension } is not allow, ${ allowExtensions }`)
        }

        
        uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
        
        file.mv(uploadPath, ( err ) => {
            if (err) {
                return reject(err);
            }
            resolve(tempName);
        });

        })
}

module.exports = {
    uploadFile
}