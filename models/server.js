
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        // Paths
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.verbPath = '/api/verbs';
        this.phrasalVerbPath = '/api/phrasalverbs';
        this.adjectivePath = '/api/adjectives';
        this.prepositionPath = '/api/prepositions';
        this.connectorPath = '/api/connectors';
        this.searchPath = '/api/search';
        this.searchUserPath = '/api/searchuser/';
        this.reportsPath = '/api/reports/';
        this.uploadsPath = '/api/uploads';



        // DB connection

        this.dbConnection();

        // Middlewares
        this.middlewares();

        // routes
        this.routes();

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse JSON
        this.app.use(express.json());

        // Public Folder
        this.app.use( express.static('public'));


        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {

        this.app.use( this.userPath, require('../routes/user.route'));
        this.app.use( this.authPath, require('../routes/auth.route'));
        this.app.use( this.verbPath, require('../routes/verb.route'));
        this.app.use( this.phrasalVerbPath, require('../routes/phrasalVerb.router'));
        this.app.use( this.adjectivePath, require('../routes/adjective.route'));
        this.app.use( this.prepositionPath, require('../routes/preposition.route'));
        this.app.use( this.connectorPath, require('../routes/connector.route'));
        this.app.use( this.searchPath, require('../routes/search.route'));
        this.app.use( this.searchUserPath, require('../routes/searchUser.route'));
        this.app.use( this.reportsPath, require('../routes/reports.route'));
        this.app.use( this.uploadsPath, require('../routes/uploads.route'))

    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server runs on port ${ this.port }`);
        })
    }
}

module.exports = Server;