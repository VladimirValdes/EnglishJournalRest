
const mongoose = require('mongoose');

const  dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('DataBase Online');
    } catch (error) {
        console.log(error);
        throw new Error('There has been an error when start the DB')
    }
}

module.exports = {
    dbConnection
}